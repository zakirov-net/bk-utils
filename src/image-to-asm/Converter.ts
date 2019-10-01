import {
    COLORS,
    PREVIEW_PIXEL_WIDTH,
    PREVIEW_PIXEL_HEIGHT,
    OUTPUT_TYPES
} from './conf';
import {
    colorToPalettes,
    colorToIndexByPalette,
    colorToComponentsWithDelta as colorComponentsConfig,
    findColor
} from './colorsConfig';
import {
    IColorComponents,
    ICropArea,
    ICropAreaInterval,
    IImageSize,
    TColorToStat,
    TPaletteToStat,
    TPixelsList
} from './interfaces';
import convertBytes from './convertBytes';

/**
 * Конвертер из данных по картинке в ассемблерный код и превьюшку
 */
export default class Converter {
    private readonly _pixels: TPixelsList;

    constructor(
        imageData: Uint8ClampedArray,
        private readonly _width: number,
        private readonly _height: number,
        private readonly _fileName: string
    ) {
        this._pixels = this._getPixels(imageData);
    }

    /**
     * Получение подходящих палитр
     */
    getMatchedPalettes(): string[] {
        const topColors = this._getTopColors(3);
        const stat: TPaletteToStat = topColors
            .reduce((acc, color) => {
                return acc.concat(colorToPalettes[color])
            }, [])
            .reduce((acc: TPaletteToStat, pal) => {
                if (!(pal in acc)) acc[pal] = 0;
                acc[pal]++;
                return acc;
            }, {});
        const max = Math.max.apply(Math, Object.keys(stat).map(pal => stat[pal]));
        const palettes: string[] = Object.keys(stat).reduce((acc, pal) => {
            const count = stat[pal];
            if (count === max) {
                acc.push((pal.length < 2 ? '0' : '') + pal);
            }
            return acc;
        }, []);
        return palettes.sort();
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
        let area: ICropAreaInterval;
        if (crop) {
            area = {
                yBegin: crop.y,
                yEnd: Math.min(crop.y + crop.height, this._height),
                xBegin: crop.x * 4,
                xEnd: Math.min((crop.x + crop.width) * 4, this._width)
            };
        } else {
            area = {
                yBegin: 0,
                yEnd: this._height,
                xBegin: 0,
                xEnd: this._width
            };
        }
        const colorToIndex = colorToIndexByPalette[paletteId];
        const bytes: number[] = this._getBytesFromPixels(colorToIndex, area);
        let text: string = convertBytes(bytes, outputType, radix, insertSize, area);
        if (text) {
            text = '\t; ' + this._fileName +
                (crop ? ' [' + crop.x + ',' + crop.y + '/' +
                    crop.width + ',' + crop.height + ']' : '') + '\r\n' + text;
        }
        return text;
    }

    /**
     * Нарисовать картинку с превьюшкой в переданном контейнере
     */
    drawResultImage(imageContainer: HTMLElement, paletteId: number): void {
        imageContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        const colorToIndex = colorToIndexByPalette[paletteId];
        canvas.width = this._width * PREVIEW_PIXEL_WIDTH;
        canvas.height = this._height * PREVIEW_PIXEL_HEIGHT;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0,
            this._width * PREVIEW_PIXEL_WIDTH, this._height * PREVIEW_PIXEL_HEIGHT);
        let i = 0;
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                let color = this._pixels[i++];
                if (color && (color in colorToIndex)) {
                    ctx.fillStyle = '#' + color;
                    ctx.fillRect(
                        x * PREVIEW_PIXEL_WIDTH,
                        y * PREVIEW_PIXEL_HEIGHT,
                        PREVIEW_PIXEL_WIDTH,
                        PREVIEW_PIXEL_HEIGHT
                    );
                }
            }
        }
        imageContainer.appendChild(canvas);
    }

    /**
     * Получить размеры исходной картинки
     */
    getSize(): IImageSize {
        return {width: this._width, height: this._height};
    }

    /**
     * Формирование списка пикселей - массив строк с кодовым обозначением цвета ('FF0000') или null для черного цвета
     */
    private _getPixels(imageData: Uint8ClampedArray): TPixelsList {
        const pixels: TPixelsList = [];
        for (let i = 0; i < imageData.length; i++) {
            let colorComponents = COLORS.reduce((acc, c) => {
                acc[c] = imageData[i++];
                return acc;
            }, {}) as IColorComponents;
            let color = COLORS.reduce((acc, c) => {
                const colorHex = colorComponents[c].toString(16);
                acc += (colorHex.length < 2 ? '0' : '') + colorHex;
                return acc;
            }, '');
            if (color === '000000') {
                color = null;
            } else if (!(color in colorComponentsConfig)) {
                color = findColor(colorComponents);
            }
            pixels.push(color);
        }
        return pixels;
    }

    /**
     * Получение списка из N (трех) наиболее часто встречающихся цветов на картинке
     */
    private _getTopColors(topCount: number): string[] {
        const stat: TColorToStat = this._pixels.reduce((acc: TColorToStat, color: string) => {
            if (color) {
                if (!(color in acc)) {
                    acc[color] = 0;
                }
                acc[color]++;
            }
            return acc;
        }, {});
        return Object.keys(stat)
            .map(color => {
                return {color: color, count: stat[color]};
            })
            .sort((a, b) => a.count - b.count)
            .slice(0, topCount)
            .map(item => item.color);
    }

    /**
     * Получение списка БКшных байтов из картинки или заданной на ней области
     */
    private _getBytesFromPixels(colorToIndex, area: ICropAreaInterval): number[] {
        const bytes: number[] = [];
        for (let y = area.yBegin; y < area.yEnd; y++) {
            let byte = 0;
            let bitsPos = 0;
            let i = y * this._width + area.xBegin;
            for (let x = area.xBegin; x < area.xEnd; x++) {
                let color = this._pixels[i++];
                if (color && (color in colorToIndex)) {
                    byte |= colorToIndex[color] << bitsPos;
                }
                bitsPos += 2;
                if (bitsPos === 8) {
                    bytes.push(byte);
                    byte = bitsPos = 0;
                }
            }
            if (bitsPos) {
                bytes.push(byte);
            }
        }
        return bytes;
    }
}
