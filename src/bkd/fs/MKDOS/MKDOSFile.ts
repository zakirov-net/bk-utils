import {FILE_TYPES, IFile} from '@bkd/FileSystem';
import {getWord} from '@common/word';
import {getLatUpperCaseString, getStringFromKOI8Bytes} from '@common/KOI8';
import MKDOS, {
    FILE_ADDRESS_WORD,
    FILE_BLOCK_BEGIN_WORD,
    FILE_BLOCKS_COUNT_WORD,
    FILE_DIR_ID_BYTE,
    FILE_IS_DIR_MARKER,
    FILE_LINK_DRIVE_BYTE,
    FILE_NAME_BEGIN,
    FILE_NAME_LENGTH,
    FILE_PARENT_ID_BYTE,
    FILE_SIZE_WORD, FILE_STATUS_BAD,
    FILE_STATUS_BYTE,
    FILE_STATUS_DELETED,
    FILE_STATUS_LOGIC_DISK,
    FILE_STATUS_PROTECTED
} from '@bkd/fs/MKDOS';

const STATUS_TO_TYPE = {
    [FILE_STATUS_LOGIC_DISK]: FILE_TYPES.LOGIC,
    [FILE_STATUS_BAD]: FILE_TYPES.BAD
};

export interface IMKDOSFile extends IFile {
    nameLatUC: string;
    blockBegin: number;
    blocksCount: number;
    dirId: number | null;
    parentId: number;
    isProtected: boolean;
}

export interface IMKDOSFileRaw {
    offset: number;
    fileData: Uint8Array;
}


export default class MKDOSFile implements IMKDOSFile {
    protected _fsOffset: number;
    protected _fileData: Uint8Array;
    protected _isDir: boolean = false;
    protected _type: FILE_TYPES;
    protected _fileName: string;
    protected _fileNameLatUC: string;
    protected _isProtected: boolean;

    constructor(protected _filesystem: MKDOS) {
    }

    get name(): string {
        return this._fileName;
    }

    get nameLatUC(): string {
        return this._fileNameLatUC;
    }

    get type(): FILE_TYPES {
        return this._type;
    }

    get address(): number {
        return getWord(this._fileData, FILE_ADDRESS_WORD);
    }

    get blockBegin(): number {
        return getWord(this._fileData, FILE_BLOCK_BEGIN_WORD);
    }

    get blocksCount(): number {
        return getWord(this._fileData, FILE_BLOCKS_COUNT_WORD);
    }

    get size(): number {
        return getWord(this._fileData, FILE_SIZE_WORD);
    }

    get parentId(): number {
        return this._fileData[FILE_PARENT_ID_BYTE];
    }

    get dirId(): number | null {
        return this._isDir ? this._fileData[FILE_DIR_ID_BYTE] : null;
    }

    get isProtected(): boolean {
        return this._isProtected;
    }

    get fsOffset(): number {
        return this._fsOffset;
    }

    get content(): Uint8Array | MKDOSFile[] | undefined {
        return this._filesystem.getFileContent(this);
    }

    setFromRawData({offset, fileData}: IMKDOSFileRaw): this {
        this._fsOffset = offset;
        this._fileData = fileData;
        let fileNameBytes = fileData.subarray(FILE_NAME_BEGIN, FILE_NAME_BEGIN + FILE_NAME_LENGTH);
        const isDir = fileNameBytes[0] === FILE_IS_DIR_MARKER;
        if (isDir) {
            fileNameBytes = fileNameBytes.subarray(1);
        }
        this._fileName = getStringFromKOI8Bytes(fileNameBytes).trim();
        const fileStatus = fileData[FILE_STATUS_BYTE];
        if (fileStatus === FILE_STATUS_DELETED) {
            this._type = FILE_TYPES.DELETED;
        } else {
            this._fileNameLatUC = (isDir ? '_' : '') + getLatUpperCaseString(fileNameBytes).trim();
            this._isDir = isDir;
            this._setType(fileStatus);
        }

        return this;
    }

    protected _setType(fileStatus): void {
        const fileData = this._fileData;
        if (this._isDir) {
            this._type = fileData[FILE_LINK_DRIVE_BYTE] ? FILE_TYPES.LINK : FILE_TYPES.DIR;
            return;
        }
        if (STATUS_TO_TYPE[fileStatus]) {
            this._type = STATUS_TO_TYPE[fileStatus];
            return;
        }
        if (fileStatus === FILE_STATUS_PROTECTED) {
            this._isProtected = true;
        }
        this._type = FILE_TYPES.FILE;
    }
}