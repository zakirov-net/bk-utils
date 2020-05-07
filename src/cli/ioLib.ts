import {sync as globSync} from 'glob';
import fs from 'fs';
import path from 'path';
import {correctFileName} from '@common/fileLib';
import {IFile} from '@bkd/filesToDisk';

export function getAllFiles(inputList: string[]): string[] {
    const files: string[] = inputList.reduce((acc, pattern) => {
        return acc.concat(globSync(pattern, {nodir: true, nocase: true}));
    }, []);
    return [...new Set(files)]; // Уникальные файлы, на всякий случай.
}

export function readFiles(fileNames: string[]): IFile[] {
    const files: IFile[] = fileNames.reduce((acc, fileName) => {
        try {
            const data = fs.readFileSync(fileName);
            const name = correctFileName(path.basename(fileName)).replace(/\.bin$/i, '');
            acc.push({name, data});
        } catch (e) {
            console.error('Не удалось считать файл: ' + fileName);
        }
        return acc;
    }, []);
    return files;
}

export function writeFile(fileName: string, data: Uint8Array) {
    let buffer: Buffer;
    try {
        buffer = Buffer.from(data);
    } catch (e) {
        buffer = new Buffer(data); // Для старых Node.js
    }
    fs.writeFileSync(fileName, buffer);
}
