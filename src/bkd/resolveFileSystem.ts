import {getWord} from '@common/word';
import MKDOS, {LABEL_MICRODOS_OFFSET, LABEL_MICRODOS_VALUE, LABEL_MKDOS_OFFSET, LABEL_MKDOS_VALUE} from './fs/MKDOS';
import Disk from './Disk';
import {IFileSystem} from './FileSystem';
import {FS_TYPES, OS_TYPES} from './types';

type TChecker = (Uint8Array) => boolean;
type TFileSystemClass<T extends IFileSystem> = {new(Disk): T};

const fsCheckers: Record<FS_TYPES, TChecker> = {
    [FS_TYPES.MicroDOS]: function(block0: Uint8Array) {
        return getWord(block0, LABEL_MICRODOS_OFFSET) === LABEL_MICRODOS_VALUE;
    }
};

const osCheckers: Record<FS_TYPES, Record<OS_TYPES, TChecker>> = {
    [FS_TYPES.MicroDOS]: {
        [OS_TYPES.MKDOS]: function(block0: Uint8Array) {
            return getWord(block0, LABEL_MKDOS_OFFSET) === LABEL_MKDOS_VALUE;
        }
    }
};

const fsClasses: Record<OS_TYPES, TFileSystemClass<IFileSystem>> = {
    [OS_TYPES.MKDOS]: MKDOS
};

function check<T extends FS_TYPES|OS_TYPES>(checkers: Record<T, TChecker>, block0: Uint8Array): T {
    type TCheckerEntry = [T, TChecker];
    const [key] = Object.entries(checkers)
        .find(([_, checker]: TCheckerEntry) => checker(block0)) as TCheckerEntry;
    return key;
}

export default function resolveFileSystem<T extends IFileSystem>(disk: Disk): TFileSystemClass<T> {
    const block0 = disk.read(0);
    let osType: OS_TYPES;
    let fsClass: TFileSystemClass<T>;
    const fsType: FS_TYPES = check(fsCheckers, block0);
    if (fsType) {
        osType = check(osCheckers[fsType], block0);
    }
    if (osType) {
        fsClass = fsClasses[osType] as TFileSystemClass<T>;
    }
    return fsClass;
}
