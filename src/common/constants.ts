export const PALETTES = [
    ['000000', '0000FF', '00FF00', 'FF0000'],
    ['000000', 'FFFF00', 'FF00FF', 'FF0000'],
    ['000000', '00FFFF', '0000FF', 'FF00FF'],
    ['000000', '00FF00', '00FFFF', 'FFFF00'],
    ['000000', 'FF00FF', '00FFFF', 'FFFFFF'],
    ['000000', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
    ['000000', 'C00000', '900000', 'FF0000'],
    ['000000', 'C0FF00', '90FF00', 'FFFF00'],
    ['000000', 'C000FF', '9000FF', 'FF00FF'],
    ['000000', '90FF00', '9000FF', '900000'],
    ['000000', 'C0FF00', 'C000FF', 'C00000'],
    ['000000', '00FFFF', 'FFFF00', 'FF0000'],
    ['000000', 'FF0000', '00FF00', '00FFFF'],
    ['000000', '00FFFF', 'FFFF00', 'FFFFFF'],
    ['000000', 'FFFF00', '00FF00', 'FFFFFF'],
    ['000000', '00FFFF', '00FF00', 'FFFFFF']
];

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

export const PIXELS_PER_BYTE_COLOR = 4;
export const BITS_MASK_COLOR = 3;

export const SCREEN_WIDTH_COLOR = 256;
export const SCREEN_HEIGHT = 256;
export const SCREEN_WIDTH_IN_BYTES = 64;

export const DEFAULT_PREVIEW_PIXEL_WIDTH = 4;
export const DEFAULT_PREVIEW_PIXEL_HEIGHT = 3;
