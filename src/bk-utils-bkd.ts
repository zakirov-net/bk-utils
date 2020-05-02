import '@common/oldNodejsPolyfills';
import minimist from 'minimist';
import path from 'path';
import fs from 'fs';
import {sync as globSync} from 'glob';
import {correctFileName} from '@common/fileLib';
import filesToDisk from '@bkd/filesToDisk';

const args = minimist(process.argv.slice(2), {
    alias: {'out': 'o'}
});

const inputFiles = args._;
if (!inputFiles.length) {
    exitWithError('Использование:\nbk-utils-bkd [--out diskName.bkd] file1.bin [file2.bin ...]');
}

const fileNames = getAllFiles(inputFiles);
if (!fileNames.length) {
    exitWithError('Не заданы подходящие для упаковки файлы');
}

const files = fileNames.reduce((acc, fileName) => {
    try {
        const data = fs.readFileSync(fileName);
        const name = correctFileName(path.basename(fileName)).replace(/\.bin$/i, '');
        acc.push({name, data});
    } catch (e) {
        console.error('Не удалось считать файл: ' + fileName);
    }
    return acc;
}, []);

if (!files.length) {
    exitWithError('Нет файлов для упаковки в образ диска');
}

const result = filesToDisk(files);
result.files.forEach((file) => {
    console.log(file.name + ' - ' + (file.error ? file.error : 'OK'));
});
if (!result.disk) {
    exitWithError('Не удалось создать образ диска');
}

const outName = args.out || result.files.filter(file => !file.error)[0].name + '.bkd';
let buffer: Buffer;
try {
    buffer = Buffer.from(result.disk);
} catch (e) {
    buffer = new Buffer(result.disk); // Для старых Node.js
}
try {
    fs.writeFileSync(outName, buffer);
    console.log('Образ диска записан в файл ' + outName);
} catch (e) {
    exitWithError('Не удалось записать образ диска в файл ' + outName);
}


function exitWithError(error) {
    console.error(error);
    process.exit(1);
}

function getAllFiles(inputList: string[]): string[] {
    const files: string[] = inputList.reduce((acc, pattern) => {
        return acc.concat(globSync(pattern, {nodir: true}));
    }, []);
    return [...new Set(files)]; // Уникальные файлы, на всякий случай.
}
