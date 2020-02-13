import FileSystem, {FILE_TYPES, IFileSystem} from '@bkd/FileSystem';
import Disk, {BLOCK_SIZE} from '@bkd/Disk';
import {FS_TYPES, OS_TYPES} from '@bkd/types';
import {getWord, setWord} from '@common/word';
import {getKOI8Bytes, getLatUpperCaseString} from '@common/KOI8';
import MKDOSFile, {IMKDOSFileRaw} from './MKDOS/MKDOSFile';

export const BLOCKS_COUNT = 1600;
export const CATALOG_BLOCKS_COUNT = 20;
export const CATALOG_BEGIN_OFFSET = 0o500;
export const TOTAL_FILES_OFFSET = 0o30;
export const TOTAL_BLOCKS_OFFSET = 0o32;
export const LABEL_MICRODOS_OFFSET = 0o400;
export const LABEL_MICRODOS_VALUE = 0o123456;
export const LABEL_MKDOS_OFFSET = 0o402;
export const LABEL_MKDOS_VALUE = 0o51414;
export const BLOCKS_COUNT_OFFSET = 0o466;
export const FIRST_FILE_BLOCK_OFFSET = 0o470;

export const FILE_RECORD_LENGTH = 0o30;
export const FILE_STATUS_BYTE = 0;
export const FILE_DIR_ID_BYTE = 0;
export const FILE_PARENT_ID_BYTE = 1;
export const FILE_NAME_BEGIN = 2;
export const FILE_NAME_LENGTH = 14;
export const FILE_IS_DIR_MARKER = 0o177;
export const FILE_BLOCK_BEGIN_WORD = 0o20;
export const FILE_BLOCKS_COUNT_WORD = 0o22;
export const FILE_ADDRESS_WORD = 0o24;
export const FILE_LINK_DRIVE_BYTE = FILE_ADDRESS_WORD;
export const FILE_SIZE_WORD = 0o26;

export const FILE_STATUS_NORMAL = 0;
export const FILE_STATUS_PROTECTED = 1;
export const FILE_STATUS_LOGIC_DISK = 2;
export const FILE_STATUS_BAD = 0o200;
export const FILE_STATUS_DELETED = 0o377;

const FILE_TYPES_IGNORE_FOR_COUNT: number[] = [FILE_STATUS_BAD, FILE_STATUS_DELETED];

interface IMKDOSNewFile {
    name: string;
    address: number;
    content: Uint8Array;
    parent?: MKDOSFile;
    isProtected?: boolean;
}

interface IMKDOSNewDir {
    name: string;
    parent?: MKDOSFile;
}

type TFilesLatMap = Record<string, MKDOSFile>;
type TDirsMap = Record<number, MKDOSFile>;
type TDirFilesMap = Record<number, MKDOSFile[]>;
type TBlocksArray = Array<MKDOSFile | undefined>

export default class MKDOS extends FileSystem implements IFileSystem {
    protected fsType: FS_TYPES = FS_TYPES.MicroDOS;
    protected osType: OS_TYPES = OS_TYPES.MKDOS;
    protected _track0: Uint8Array;
    protected _filesList: MKDOSFile[] = [];
    protected _filesByNameLatUC:  TFilesLatMap = {};
    protected _dirs: TDirsMap = {};
    protected _dirFiles: TDirFilesMap = {};
    protected _blocks: TBlocksArray = new Array(BLOCKS_COUNT).fill(undefined);

    constructor(disk: Disk) {
        super(disk);
        this._initFilesList();
    }

    fileExists(name: string, isDir: boolean = false): boolean {
        const nameLatUC = this._fileNameToLatUC(name, isDir);
        return nameLatUC in this._filesByNameLatUC;
    }

    getFileByName(name: string, isDir: boolean = false): MKDOSFile | undefined {
        const nameLatUC = this._fileNameToLatUC(name, isDir);
        return this._filesByNameLatUC[nameLatUC];
    }

    getFilesByDir(dir?: MKDOSFile): MKDOSFile[] {
        const dirId = dir ? dir.dirId : 0;
        return [...this._dirFiles[dirId]];
    }

    getFileContent(file: MKDOSFile): Uint8Array | MKDOSFile[] | undefined {
        switch (file.type) {
            case FILE_TYPES.FILE:
                const blocksContent: Uint8Array = this._disk.read(file.blockBegin, file.blocksCount);
                return blocksContent.subarray(0, file.size);
            case FILE_TYPES.DIR:
                return this.getFilesByDir(file);
        }
    }

    getFilesList(): MKDOSFile[] {
        return [...this._filesList];
    }

    saveFile(file: IMKDOSNewFile): MKDOSFile {
        if (!file.name) {
            throw new Error('Пустое имя файла');
        }
        file.name = file.name.substr(0, FILE_NAME_LENGTH).trim();
        if (this.fileExists(file.name)) {
            throw new Error('Файл с таким именем уже существует');
        }
        const fileSize = file.content.length;
        const blocksCount = Math.ceil(fileSize / BLOCK_SIZE);
        const blockBegin = this._findRoomForFile(blocksCount);
        if (!blockBegin) {
            throw new Error('Недостаточно места на диске');
        }
        const filesCount = this._filesList.length;
        const offset = filesCount ? this._filesList[filesCount - 1].fsOffset + FILE_RECORD_LENGTH : CATALOG_BEGIN_OFFSET;
        // TODO Добавить проверку, есть ли место в каталоге
        const fileData = new Uint8Array(FILE_RECORD_LENGTH);
        fileData[FILE_STATUS_BYTE] = file.isProtected ? FILE_STATUS_PROTECTED : FILE_STATUS_NORMAL;
        fileData[FILE_PARENT_ID_BYTE] = file.parent ? file.parent.dirId : 0;
        const fileNameBytes = getKOI8Bytes(file.name.padEnd(FILE_NAME_LENGTH));
        fileData.set(fileNameBytes, FILE_NAME_BEGIN);
        setWord(fileData, FILE_BLOCK_BEGIN_WORD, blockBegin);
        setWord(fileData, FILE_BLOCKS_COUNT_WORD, blocksCount);
        setWord(fileData, FILE_ADDRESS_WORD, file.address);
        setWord(fileData, FILE_SIZE_WORD, fileSize);
        const track0 = this._track0;
        track0.set(fileData, offset);
        const totalFiles = getWord(track0, TOTAL_FILES_OFFSET) + 1;
        const totalBlocks = getWord(track0, TOTAL_BLOCKS_OFFSET) + blocksCount;
        setWord(track0, TOTAL_FILES_OFFSET, totalFiles);
        setWord(track0, TOTAL_BLOCKS_OFFSET, totalBlocks);
        this._disk
            .write(0, track0)
            .write(blockBegin, file.content);
        return this._addFile({offset, fileData});
    }

    mkDir(dir: IMKDOSNewDir): MKDOSFile {
        if (!dir.name) {
            throw new Error('Пустое имя директории');
        }
        dir.name = dir.name.substr(0, FILE_NAME_LENGTH - 1).trim();
        if (this.fileExists(dir.name, true)) {
            throw new Error('Директория с таким именем уже существует');
        }
        const filesCount = this._filesList.length;
        let offset;
        let blockBegin;
        if (filesCount) {
            const lastFile = this._filesList[filesCount - 1];
            offset = lastFile.fsOffset + FILE_RECORD_LENGTH;
            blockBegin = lastFile.blockBegin + lastFile.blocksCount;
        } else {
            offset = CATALOG_BEGIN_OFFSET;
            blockBegin = CATALOG_BLOCKS_COUNT;
        }
        const dirIds = Object.keys(this._dirs);
        const dirId = dirIds.length ? Math.max.apply(null, dirIds) + 1 : 1;
        if (dirId > 255) {
            throw new Error('Слишком много директорий');
        }
        // TODO Добавить проверку, есть ли место в каталоге
        const fileData = new Uint8Array(FILE_RECORD_LENGTH);
        fileData[FILE_DIR_ID_BYTE] = dirId;
        fileData[FILE_PARENT_ID_BYTE] = dir.parent ? dir.parent.dirId : 0;
        const fileNameBytes = getKOI8Bytes(dir.name.padEnd(FILE_NAME_LENGTH - 1));
        fileData[FILE_NAME_BEGIN] = FILE_IS_DIR_MARKER;
        fileData.set(fileNameBytes, FILE_NAME_BEGIN + 1);
        setWord(fileData, FILE_BLOCK_BEGIN_WORD, blockBegin);
        const track0 = this._track0;
        track0.set(fileData, offset);
        const totalFiles = getWord(track0, TOTAL_FILES_OFFSET) + 1;
        setWord(track0, TOTAL_FILES_OFFSET, totalFiles);
        this._disk
            .write(0, track0);
        return this._addFile({offset, fileData});
    }

    protected _findRoomForFile(needBlocksCount: number): number | undefined {
        for (let i = CATALOG_BLOCKS_COUNT; i < BLOCKS_COUNT; i++) {
            if (this._blocks[i]) {
                continue;
            }
            if (BLOCKS_COUNT - i < needBlocksCount) {
                // Уже точно нет места
                return;
            }
            let blockBegin = i;
            let blockEnd = blockBegin + needBlocksCount;
            for (; i < blockEnd; i++) {
                // Проверяем, есть ли непрерывное пространство
                if (this._blocks[i]) {
                    break;
                }
            }
            if (i === blockEnd) {
                // Нашли достаточно места
                return blockBegin;
            }
        }
    }

    protected _fileNameToLatUC(name: string, isDir: boolean = false): string {
        return (isDir ? '_' : '') + getLatUpperCaseString(getKOI8Bytes(name));
    }

    protected _initFilesList(): void {
        this._track0 = this._disk.read(0, CATALOG_BLOCKS_COUNT);
        Array.from(this._generateFilesData(this._track0)).forEach(
            this._addFile.bind(this)
        );
    }

    protected _addFile(raw: IMKDOSFileRaw) {
        const file = new MKDOSFile(this);
        file.setFromRawData(raw);
        this._filesList.push(file);
        this._processFile(file);
        return file;
    }

    protected _processFile(file: MKDOSFile) {
        if (file.type === FILE_TYPES.DIR) {
            this._dirs[file.dirId] = file;
        }
        if (!this._dirFiles[file.parentId]) {
            this._dirFiles[file.parentId] = [];
        }
        this._dirFiles[file.parentId].push(file);
        if (file.nameLatUC) {
            this._filesByNameLatUC[file.nameLatUC] = file;
        }
        if (file.blocksCount > 0) {
            this._blocks.fill(file, file.blockBegin, file.blockBegin + file.blocksCount);
        }
    }

    protected *_generateFilesData(track0: Uint8Array): Generator<IMKDOSFileRaw> {
        let filesCount = getWord(track0, TOTAL_FILES_OFFSET);
        let offset = CATALOG_BEGIN_OFFSET;
        while (filesCount) {
            const fileData = track0.subarray(offset, offset + FILE_RECORD_LENGTH);
            const fileType = fileData[0];
            if (FILE_TYPES_IGNORE_FOR_COUNT.indexOf(fileType) === -1) {
                filesCount--;
            }
            yield {offset, fileData};
            offset += FILE_RECORD_LENGTH;
        }
    }
}
