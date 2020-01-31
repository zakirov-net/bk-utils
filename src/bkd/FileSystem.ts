import Disk from './Disk';
import {FS_TYPES, OS_TYPES} from './types';

export enum FILE_TYPES {
    FILE = 'FILE',
    DIR = 'DIR',
    LINK = 'LINK',
    LOGIC = 'LOGIC',
    BAD = 'BAD',
    DELETED = 'DELETED'
}

export interface IFile {
    name: string;
    address: number;
    size: number;
    type: FILE_TYPES;
    content: Uint8Array | IFile[] | null;
    parent?: IFile | null;
}

export interface IFileSystem {
    getFilesList: () => IFile[];
    /*findFile: (name: string) => IFile;
    addFile: (file: IFile) => IFileSystem;*/
}

export default abstract class FileSystem {
    protected osType: OS_TYPES;
    protected fsType: FS_TYPES;
    constructor(protected _disk: Disk) {}

    test(): OS_TYPES {
        return this.osType;
    }

    getData(): Uint8Array {
        return this._disk.getData();
    }
}
