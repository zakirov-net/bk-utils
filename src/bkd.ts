import filesToDisk, {IFile, IResult} from './bkd/filesToDisk';
import {correctFileName, readFileAsArrayBuffer, saveToFile} from './common/fileLib';

const fileInput = getInput('#file');
const resultDiv = getElement('#resultFiles');
let result: IResult;

fileInput.addEventListener('change', filesChanged);

getElement('#saveButton').addEventListener('click', saveFile);

function filesChanged() {
    resultDiv.innerHTML = '';
    result = undefined;
    const files = Array.from(fileInput.files);
    if (files.length) {
        const filePromises: Promise<IFile>[] = files.map(file => {
            const name = correctFileName(file.name.replace(/\.bin$/i, ''));
            return readFileAsArrayBuffer(file).then(data => {
                return {name, data};
            });
        });

        Promise.all(filePromises).then(files => {
            result = filesToDisk(files);
            resultDiv.innerHTML = result.files.map(file => {
                return '<div>' + file.name +
                    (file.error ? ` - <span class="error">${file.error}</span>` : '') +
                    '</div>';
            }).join('');
        });
    }
}

function saveFile() {
    if (result && result.disk) {
        const fileName = result.files.filter(file => !file.error)[0].name + '.bkd';
        saveToFile(fileName, result.disk);
    }
}

function getElement(selector: string): HTMLElement {
    return document.querySelector(selector);
}

function getInput(selector: string): HTMLInputElement {
    return getElement(selector) as HTMLInputElement;
}