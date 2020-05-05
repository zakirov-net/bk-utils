import '@cli/oldNodejsPolyfills';
import minimist from 'minimist';
import {getAllFiles, readFiles, writeFile} from '@cli/ioLib';
import {ADDRESS_MIN_TURBO, MODELS_LIST} from '@wav-converter/conf';
import filedataToBinary from '@common/filedataToBinary';
import binaryToSound from '@wav-converter/binaryToSound';

const modesTable = {
    bk10: {mode: MODELS_LIST.BK10, boost: false},
    bk10boost: {mode: MODELS_LIST.BK10, boost: true},
    bk11: {mode: MODELS_LIST.BK11, boost: false},
    bk11boost: {mode: MODELS_LIST.BK11, boost: true},
    turbo: {mode: MODELS_LIST.TURBO, boost: false}
};

const args = minimist(process.argv.slice(2), {
    alias: {out: 'o', mode: 'm'},
    default: {mode: 'bk10'}
});
args.mode = args.mode.toLowerCase();

const inputFiles = args._;
if (!inputFiles.length || !(args.mode in modesTable)) {
    exitWithError('Использование:\nbk-utils-wav [--mode bk10|bk10boost|bk11|bk11boost|turbo] [--out file.wav] file.bin [file2.bin ...]');
}

const {mode, boost} = modesTable[args.mode];

const fileNames = getAllFiles(inputFiles);
if (!fileNames.length) {
    exitWithError('Не заданы подходящие для конвертирования файлы');
}

const files = readFiles(fileNames);
if (!files.length) {
    exitWithError('Нет файлов для конвертирования');
}

files.forEach((file) => {
    const fileResult = filedataToBinary(file.data);
    if (fileResult.error) {
        console.log(file.name + ' - ' + fileResult.error);
        return;
    }
    if (mode === MODELS_LIST.TURBO && fileResult.address < ADDRESS_MIN_TURBO) {
        console.log(file.name + ' - ' + 'Адрес загрузки меньше ' + ADDRESS_MIN_TURBO.toString(8));
        return;
    }
    const wavFile = binaryToSound(fileResult.binary, file.name, mode, boost);
    const outName = files.length === 1 && args.out ? args.out : file.name + '.wav';
    try {
        writeFile(outName, wavFile);
        console.log('Звук записан в файл ' + outName);
    } catch (e) {
        exitWithError('Не удалось записать файл ' + outName);
    }
});


function exitWithError(error) {
    console.error(error);
    process.exit(1);
}
