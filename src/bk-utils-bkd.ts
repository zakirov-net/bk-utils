import '@cli/oldNodejsPolyfills';
import minimist from 'minimist';
import {getAllFiles, readFiles, writeFile} from '@cli/ioLib';
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

const files = readFiles(fileNames);
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
