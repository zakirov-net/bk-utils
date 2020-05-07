import createDisk from './fs/MKDOS/createDisk';
import filedataToBinary from '@common/filedataToBinary';

export interface IFile {
    name: string;
    data: ArrayBuffer;
}

export interface IResultFile {
    name: string;
    error?: string;
}

export interface IResult {
    disk: Uint8Array | null;
    files: IResultFile[];
}

export default function filesToDisk(files: IFile[], withBootLoader: boolean = true): IResult {
    const fileSystem = createDisk(withBootLoader);
    const resultFiles: IResultFile[] = [];
    for (const file of files) {
        const {binary: fileBinary, error} = filedataToBinary(file.data);
        const resultFile: IResultFile = {name: file.name};
        if (error) {
            resultFile.error = error;
        } else {
            const address = fileBinary.getWord(0);
            try {
                fileSystem.saveFile({
                    name: file.name,
                    address,
                    content: fileBinary.sliceUint8Array(4)
                });
            } catch (e) {
                resultFile.error = e.message;
            }
        }
        resultFiles.push(resultFile);
    }
    const disk = resultFiles.some(file => !file.error) ? fileSystem.getData() : null;
    return {
        disk,
        files: resultFiles
    };
}
