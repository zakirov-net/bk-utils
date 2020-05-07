import MKDOS, {
    BLOCKS_COUNT, BLOCKS_COUNT_OFFSET,
    CATALOG_BLOCKS_COUNT, FIRST_FILE_BLOCK_OFFSET,
    LABEL_MICRODOS_OFFSET,
    LABEL_MICRODOS_VALUE, LABEL_MKDOS_OFFSET, LABEL_MKDOS_VALUE,
    TOTAL_BLOCKS_OFFSET
} from '@bkd/fs/MKDOS';
import Disk, {BLOCK_SIZE} from '@bkd/Disk';
import {decode} from 'base64-arraybuffer';
import {setWord} from '@common/word';
import {BOOT_LOADER_BASE64, diskDump} from './diskDump';
import MKDOSFile from './MKDOSFile';

export interface IStructItem {
    name: string;
    address?: number;
    content?: string;
    files?: IStructItem[];
    isProtected?: boolean;
}

export default function createDisk(withBootLoader: boolean = true): MKDOS {
    const fileSystem = initMKDOSDisk(withBootLoader);
    if (withBootLoader) {
        saveFilesDump(fileSystem, diskDump);
    }
    return fileSystem;
}

export function initMKDOSDisk(withBootLoader: boolean = false): MKDOS {
    const block0 = new Uint8Array(BLOCK_SIZE);
    if (withBootLoader) {
        const bootLoader = new Uint8Array(decode(BOOT_LOADER_BASE64));
        block0.set(bootLoader);
    }
    setWord(block0, TOTAL_BLOCKS_OFFSET, CATALOG_BLOCKS_COUNT);
    setWord(block0, LABEL_MICRODOS_OFFSET, LABEL_MICRODOS_VALUE);
    setWord(block0, LABEL_MKDOS_OFFSET, LABEL_MKDOS_VALUE);
    setWord(block0, BLOCKS_COUNT_OFFSET, BLOCKS_COUNT);
    setWord(block0, FIRST_FILE_BLOCK_OFFSET, CATALOG_BLOCKS_COUNT);
    const disk = new Disk(CATALOG_BLOCKS_COUNT);
    disk.write(0, block0);
    return new MKDOS(disk);
}

export function saveFilesDump(fileSystem: MKDOS, files: IStructItem[], parentDir?: MKDOSFile): MKDOS {
    for (const file of files) {
        if ('files' in file) {
            const dir = fileSystem.mkDir({
                name: file.name,
                parent: parentDir
            });
            saveFilesDump(fileSystem, file.files, dir);
        } else {
            fileSystem.saveFile({
                name: file.name,
                address: file.address,
                isProtected: !!file.isProtected,
                content: new Uint8Array(decode(file.content)),
                parent: parentDir
            });
        }
    }
    return fileSystem;
}