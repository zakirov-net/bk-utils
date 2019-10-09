import Converter from './Converter';
import {
    SCREEN_WIDTH_COLOR,
    SCREEN_HEIGHT
} from '../common/constants';

interface IConverterOrError {
    error: string | undefined;
    converter: Converter | undefined;
}

/**
 * Получение конвертера из выбранного файла, принимает дополнительно элемент img,
 * в котором отображаем выбранную картинку и контейнер для отображения БКшной превьюшки
 */
export default function createConverter(
    file: File,
    img: HTMLImageElement,
    resultImageContainer: HTMLElement
): Promise<IConverterOrError> {
    return readFileAsDataURL(file)
        .then(dataURL => setImageSrc(img, dataURL))
        .then(() => {
            let error;
            let converter;
            const imageWidth = img.width;
            const imageHeight = img.height;
            if (!imageWidth || !imageHeight) {
                error = 'Некорректное изображение';
            } else if (imageWidth > SCREEN_WIDTH_COLOR || imageHeight > SCREEN_HEIGHT) {
                error = `Изображение больше, чем ${SCREEN_WIDTH_COLOR}x${SCREEN_HEIGHT}`;
            } else {
                const imageData = getImageData(img, imageWidth, imageHeight);
                converter = new Converter(imageData, imageWidth, imageHeight, getFileName(file), resultImageContainer);
            }
            return {error: error, converter: converter};
        });
}

/**
 * Читаем выбранный файл в виде DataURL
 */
function readFileAsDataURL(file): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Отображение выбранной картинки
 */
function setImageSrc(img: HTMLImageElement, url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve(img);
        };
        img.src = url;
    });
}

/**
 * Побеждаем глюк файловой системы macos с буквами Й и Ё
 */
function getFileName(file: File): string {
    return file.name
        .replace(/И\u0306/g, 'Й')
        .replace(/и\u0306/g, 'й')
        .replace(/Е\u0308/g, 'Ё')
        .replace(/е\u0308/g, 'ё');
}

/**
 * Получение массива цветов точек изображений, по 4 элемента на точку
 * в формате [r0, g0, b0, a0, r1, ...]
 */
function getImageData(img, width, height): Uint8ClampedArray {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, width, height).data;
}
