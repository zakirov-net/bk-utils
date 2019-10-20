import Converter from './Converter';
import {
    SCREEN_WIDTH_COLOR,
    SCREEN_HEIGHT
} from '../common/constants';
import {
    getFileName,
    readFileAsDataURL
} from '../common/fileLib';
import {
    getImageData,
    setImageSrc
} from '../common/imageLib';

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
            } else if (width > SCREEN_WIDTH_COLOR || height > SCREEN_HEIGHT) {
                error = `Изображение больше, чем ${SCREEN_WIDTH_COLOR}x${SCREEN_HEIGHT}`;
            } else {
                const serviceCanvas = document.createElement('canvas');
                const imageData = getImageData(img, serviceCanvas);
                converter = new Converter(imageData, width, height, getFileName(file), resultCanvas);
            }
            return {error: error, converter: converter};
        });
}
