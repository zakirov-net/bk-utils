import Converter from './Converter';
import {
    IMAGE_WIDTH_MAX,
    IMAGE_HEIGHT_MAX
} from './conf';
import {
    correctFileName,
    readFileAsDataURL
} from '@common/fileLib';
import {
    getImageData,
    setImageSrc
} from '@common/imageLib';

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
    resultCanvas: HTMLCanvasElement
): Promise<IConverterOrError> {
    return readFileAsDataURL(file)
        .then(dataURL => setImageSrc(img, dataURL))
        .then(() => {
            let error;
            let converter;
            const width = img.width;
            const height = img.height;
            if (!width || !height) {
                error = 'Некорректное изображение';
            } else if (width > IMAGE_WIDTH_MAX || height > IMAGE_HEIGHT_MAX) {
                error = `Изображение больше, чем ${IMAGE_WIDTH_MAX}x${IMAGE_HEIGHT_MAX}`;
            } else {
                const serviceCanvas = document.createElement('canvas');
                const imageData = getImageData(img, serviceCanvas);
                converter = new Converter(imageData, width, height, correctFileName(file.name), resultCanvas);
            }
            return {error: error, converter: converter};
        });
}
