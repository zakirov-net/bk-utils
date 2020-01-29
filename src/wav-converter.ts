import {ADDRESS_MIN_TURBO, MODELS_LIST} from './wav-converter/conf';
import {readFileAsArrayBuffer, saveToFile} from './common/fileLib';
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
    hideError();
    hideAddress();
    const file = fileInput.files[0];
    if (!file) {
        fileResult = undefined;
        return;
    }
    readFileAsArrayBuffer(file).then((result: ArrayBuffer) => {
        fileResult = filedataToBinary(result);
        if (fileResult.error) {
            showError(fileResult.error);
        } else {
            showAddress(fileResult.binary.getWord(0));
        }
    });
});

// Точка входа при нажатии на кнопку конвертирования
function convertFile() {
    if (fileResult && !fileResult.error) {
        hideError();
        const file = fileInput.files[0];
        const model = getModel();
        if (model === MODELS_LIST.TURBO && fileResult.address < ADDRESS_MIN_TURBO) {
            showError('Адрес загрузки меньше ' + ADDRESS_MIN_TURBO.toString(8));
            return;
        }
        const baseName = file.name.replace(/\.bin$/i, '');
        const speedBoost = getInput('#speed').checked;
        const wavFile = binaryToSound(fileResult.binary, baseName, model, speedBoost);
        saveToFile(baseName + '.wav', wavFile);
    }
}

function getModel(): MODELS_LIST {
    return getInput('[name=model]:checked').value as MODELS_LIST;
}

function modelChanged(model) {
    getInput('#speedContainer').style.display = model === MODELS_LIST.TURBO ? 'none' : 'block';
}

function showError(error) {
    blockError.innerHTML = error + '<br><br>';
}

function hideError() {
    blockError.innerHTML = '';
}

function showAddress(address) {
    blockAddress.innerHTML = 'Адрес загрузки файла: ' + address.toString(8) + '<br><br>';
}

function hideAddress() {
    blockAddress.innerHTML = '';
}

function getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
}

function getInput(selector: string): HTMLInputElement {
    return getElement(selector) as HTMLInputElement;
}
