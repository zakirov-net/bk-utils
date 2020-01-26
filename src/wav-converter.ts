import {MODELS_LIST} from './wav-converter/conf';
import {
    readFileAsArrayBuffer,
    saveToFile
} from './common/fileLib';
import binaryToSound from './wav-converter/binaryToSound';
import filedataToBinary, {IBinaryOrError} from './common/filedataToBinary';

Array.from(document.querySelectorAll('[name=model]')).forEach((el) => {
    el.addEventListener('click', function() {
        modelChanged(this.value);
    });
});

getElement('#convertButton').addEventListener('click', convertFile);

const blockError = getElement('#error');
const blockAddress = getElement('#address');
const fileInput = getInput('#file');
let fileResult: IBinaryOrError;

fileInput.addEventListener('change', () => {
    blockError.innerHTML = '';
    blockAddress.innerHTML = '';
    const file = fileInput.files[0];
    if (!file) {
        fileResult = undefined;
        return;
    }
    readFileAsArrayBuffer(file).then((result: ArrayBuffer) => {
        fileResult = filedataToBinary(result);
        if (fileResult.error) {
            blockError.innerHTML = fileResult.error + '<br><br>';
        } else {
            blockAddress.innerHTML = 'Адрес загрузки файла: ' + fileResult.binary.getWord(0).toString(8) + '<sub>8</sub><br><br>';
        }
    });
});

// Точка входа при нажатии на кнопку конвертирования
function convertFile() {
    if (fileResult && !fileResult.error) {
        const file = fileInput.files[0];
        const model = getInput('[name=model]:checked').value as MODELS_LIST;
        const baseName = file.name.replace(/\.bin$/i, '');
        const speedBoost = getInput('#speed').checked;
        const wavFile = binaryToSound(fileResult.binary, baseName, model, speedBoost);
        saveToFile(baseName + '.wav', wavFile);
    }
}

function modelChanged(model) {
    getInput('#speedContainer').style.display = model === MODELS_LIST.TURBO ? 'none' : 'block';
}

function getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
}

function getInput(selector: string): HTMLInputElement {
    return getElement(selector) as HTMLInputElement;
}
