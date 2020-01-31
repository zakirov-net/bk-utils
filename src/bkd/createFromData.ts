import Disk, {BLOCK_SIZE} from './Disk';
import resolveFileSystem from './resolveFileSystem';
import {IFileSystem} from './FileSystem';

interface IFileSystemOrError<T extends IFileSystem> {
    fs?: T | undefined,
    error?: string | undefined
}

export default function createFromData<T extends IFileSystem>(data: ArrayLike<number>): IFileSystemOrError<T> {
    const disk = new Disk(data);
    const fsClass = resolveFileSystem<T>(disk);
    let fs: T;
    let error: string;
    if (fsClass) {
        fs = new fsClass(disk);
    } else {
        error = 'Не удалось определить файловую систему';
    }
    return {fs, error};
}
