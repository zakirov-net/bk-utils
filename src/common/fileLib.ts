/**
 * Читаем выбранный файл в виде DataURL
 */
export function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Побеждаем глюк файловой системы macos с буквами Й и Ё
 */
export function getFileName(file: File): string {
    return file.name
        .replace(/И\u0306/g, 'Й')
        .replace(/и\u0306/g, 'й')
        .replace(/Е\u0308/g, 'Ё')
        .replace(/е\u0308/g, 'ё');
}
