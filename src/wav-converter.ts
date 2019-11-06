import {
    ADDRESS_MAX,
    ADDRESS_MIN,
    ADDRESS_MIN_TURBO,
    MODELS_LIST
} from './wav-converter/conf';
import {
    readFileAsArrayBuffer,
    saveToFile
} from './common/fileLib';
import binaryToSound from './wav-converter/binaryToSound';
import filedataToBinary from './common/filedataToBinary';

Array.from(document.querySelectorAll('[name=model]')).forEach((el) => {
    el.addEventListener('click', function() {
        modelChanged(this.value);
    });
});

getElement('#convertButton').addEventListener('click', convertFile);

// Точка входа при нажатии на кнопку конвертирования
function convertFile() {
    const file = getInput('#file').files[0];
    if (!file) return;
    readFileAsArrayBuffer(file).then((result: ArrayBuffer) => {
        const model = getInput('[name=model]:checked').value as MODELS_LIST;
        const {binary, error} = filedataToBinary(
            result,
            model === MODELS_LIST.TURBO ? ADDRESS_MIN_TURBO : ADDRESS_MIN,
            ADDRESS_MAX
        );
        if (error) {
            getElement('#error').innerHTML = error;
        } else {
            const baseName = file.name.replace(/\.[^.]*$/, '');
            const speedBoost = getInput('#speed').checked;
            const wavFile = binaryToSound(binary, baseName, model, speedBoost);
            saveToFile(baseName + '.wav', wavFile);
        }
    });
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
