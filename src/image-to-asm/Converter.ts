import {
    PREVIEW_PIXEL_WIDTH,
    PREVIEW_PIXEL_HEIGHT,
    ASM_NEW_LINE,
    ASM_LINE_PREFIX
} from './conf';
import {OUTPUT_TYPES} from '@common/constants';
import {
    TPixelsList,
    getPixels,
    getMatchedPalettes
} from './colorsLib';
import BKBinaryImage, {ICropArea} from '@common/BKBinaryImage';
import pixelsToBinary from './pixelsToBinary';
import binaryToAsmText from './binaryToAsmText';
import bytesToCanvas from '@common/bytesToCanvas';

interface IImageSize {
    width: number;
    height: number;
}

/**
 * Конвертер из данных по картинке в ассемблерный код и превьюшку
 */
export default class Converter {
    private readonly _pixels: TPixelsList;
    private _binary: BKBinaryImage;
    private _lastPalette: number;

    constructor(
        imageData: Uint8ClampedArray,
        private readonly _width: number,
        private readonly _height: number,
        private readonly _fileName: string,
        private readonly _resultCanvas?: HTMLCanvasElement
    ) {
        this._pixels = getPixels(imageData);
    }

    /**
     * Получение подходящих палитр
     */
    getMatchedPalettes(): string[] {
        return getMatchedPalettes(this._pixels);
    }

    /**
     * Получение исходного кода из картинки
     */
    getSourceText(
        paletteId: number,
        outputType: OUTPUT_TYPES,
        radix: number,
        insertSize: boolean,
        crop: ICropArea | null
    ): string {
        if (paletteId !== this._lastPalette) {
            this._binary = pixelsToBinary(this._pixels, this._width, this._height, paletteId);
            this._drawResultImage(paletteId);
        }
        let text = binaryToAsmText(this._binary, outputType, radix, insertSize, crop);
        if (text) {
            text = ASM_LINE_PREFIX + '; ' + this._fileName +
                (crop ? ` [${crop.x},${crop.y}/${crop.width},${crop.height}]` : '') +
                ASM_NEW_LINE + text;
        }
        return text;
    }

    /**
     * Получить размеры исходной картинки
     */
    getSize(): IImageSize {
        return {width: this._width, height: this._height};
    }

    /**
     * Нарисовать картинку с превьюшкой в переданном контейнере
     */
    private _drawResultImage(paletteId: number): void {
        if (this._resultCanvas) {
            bytesToCanvas(
                this._binary.getUint8Array(),
                this._resultCanvas,
                {
                    bytesPerLine: this._binary.width,
                    pixelWidth: PREVIEW_PIXEL_WIDTH,
                    pixelHeight: PREVIEW_PIXEL_HEIGHT,
                    paletteId
                }
            );
        }
    }
}
