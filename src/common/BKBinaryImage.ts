import BKBinary, {IBinaryOptions} from './Binary';
import {
    SCREEN_WIDTH_IN_BYTES,
    SCREEN_HEIGHT
} from './constants';

export interface IBKBinaryImageOptions extends IBinaryOptions {
    width?: number;
    height?: number;
}

export interface ICropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Класс бинарников-картинок
 */
export default class BKBinaryImage extends BKBinary {
    protected readonly _width: number;
    protected readonly _height: number;

    constructor(
        input: any,
        {
            width = SCREEN_WIDTH_IN_BYTES,
            height = SCREEN_HEIGHT,
            ...options
        }: IBKBinaryImageOptions = {}
    ) {
        super(input, options);
        this._width = width;
        this._height = height;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    crop(area: ICropArea): BKBinaryImage {
        const {x, y, width, height} = area;
        const newData = new Uint8Array(width * height);
        for (let line = y; line < y + height; line++) {
            const cropBegin = line * this._width + x;
            const lineData = this._data.subarray(cropBegin, cropBegin + width);
            newData.set(lineData, (line - y) * width);
        }
        return new BKBinaryImage(newData, {width, height});
    }

    static createImage(width: number, height: number): BKBinaryImage {
        return new BKBinaryImage(width * height, {width, height});
    }
}
