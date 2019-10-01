export const PREVIEW_PIXEL_WIDTH = 4;
export const PREVIEW_PIXEL_HEIGHT = 3;
export const STORAGE_KEY_SETS = 'setsData';
export const STORAGE_KEY_CROP = 'cropData';
export const RADIX_LIST = ['2', '8', '10', '16'];
export enum OUTPUT_TYPES {
    WORD = 'WORD',
    BYTE = 'BYTE'
}

export const DIGITS_COUNT = {
    [OUTPUT_TYPES.BYTE]: {
        2: 8,
        8: 3,
        10: 3,
        16: 2
    },
    [OUTPUT_TYPES.WORD]: {
        2: 16,
        8: 6,
        10: 5,
        16: 4
    }
};
export const COLORS = ['r', 'g', 'b'];
export const PALETTES = [
    ['0000FF', '00FF00', 'FF0000'],
    ['FFFF00', 'FF00FF', 'FF0000'],
    ['00FFFF', '0000FF', 'FF00FF'],
    ['00FF00', '00FFFF', 'FFFF00'],
    ['FF00FF', '00FFFF', 'FFFFFF'],
    ['FFFFFF', 'FFFFFF', 'FFFFFF'],
    ['C00000', '900000', 'FF0000'],
    ['C0FF00', '90FF00', 'FFFF00'],
    ['C000FF', '9000FF', 'FF00FF'],
    ['90FF00', '9000FF', '900000'],
    ['C0FF00', 'C000FF', 'C00000'],
    ['00FFFF', 'FFFF00', 'FF0000'],
    ['FF0000', '00FF00', '00FFFF'],
    ['00FFFF', 'FFFF00', 'FFFFFF'],
    ['FFFF00', '00FF00', 'FFFFFF'],
    ['00FFFF', '00FF00', 'FFFFFF']
];

export const COLOR_DELTA = Math.round(256 * 0.05); // Допуск 5% для цветового компонента
