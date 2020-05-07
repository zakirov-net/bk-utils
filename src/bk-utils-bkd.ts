import '@cli/oldNodejsPolyfills';
import minimist from 'minimist';
import {getAllFiles, readFiles, writeFile} from '@cli/ioLib';
import filesToDisk from '@bkd/filesToDisk';

enum IMAGE_BASES {
    empty = 'empty',
    bootable = 'bootable'
}

const args = minimist(process.argv.slice(2), {
    alias: {disk: 'd', out: 'o'},
    default: {disk: IMAGE_BASES.bootable}
});

const inputFiles = args._;
if (!inputFiles.length || !(args.disk in IMAGE_BASES)) {
    exitWithError('Использование:\nbk-utils-bkd [--disk empty|bootable] [--out diskName.bkd] file1.bin [file2.bin ...]');
}

const fileNames = getAllFiles(inputFiles);
if (!fileNames.length) {
    exitWithError('Не заданы подходящие для упаковки файлы');
}

const files = readFiles(fileNames);
if (!files.length) {
    exitWithError('Нет файлов для упаковки в образ диска');
}

const withBootLoader = args.disk === IMAGE_BASES.bootable;
const result = filesToDisk(files, withBootLoader);
result.files.forEach((file) => {
    console.log(file.name + ' - ' + (file.error ? file.error : 'OK'));
});
if (!result.disk) {
    exitWithError('Не удалось создать образ диска');
}

const outName = args.out || result.files.filter(file => !file.error)[0].name + '.bkd';
try {
    writeFile(outName, result.disk);
    console.log('Образ диска записан в файл ' + outName);
} catch (e) {
    exitWithError('Не удалось записать образ диска в файл ' + outName);
}


function exitWithError(error) {
    console.error(error);
    process.exit(1);
}
