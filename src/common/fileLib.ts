/**
 * Читаем выбранный файл в виде DataURL
 */
export function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Читаем выбранный файл в виде DataURL
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as ArrayBuffer);
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Побеждаем глюк файловой системы macos с буквами Й и Ё
 */
export function correctFileName(fileName: string): string {
    return fileName
        .replace(/И\u0306/g, 'Й')
        .replace(/и\u0306/g, 'й')
        .replace(/Е\u0308/g, 'Ё')
        .replace(/е\u0308/g, 'ё');
}

export function saveToFile(name: string, dataArray: Uint8Array) {
    const blob = new Blob(
        [dataArray],
        {type: 'application/octet-stream'}
    );
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
        window.navigator.msSaveOrOpenBlob(blob, name);
    } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}
