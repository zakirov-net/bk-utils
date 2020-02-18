import {
    SCREEN_WIDTH_COLOR,
    SCREEN_WIDTH_IN_BYTES,
    SCREEN_HEIGHT,
    DEFAULT_PREVIEW_PIXEL_HEIGHT,
    DEFAULT_PREVIEW_PIXEL_WIDTH
} from '@common/constants';

export const IMAGE_WIDTH_MAX = SCREEN_WIDTH_COLOR * 2;
export const IMAGE_WIDTH_IN_BYTES_MAX = SCREEN_WIDTH_IN_BYTES * 2;
export const IMAGE_HEIGHT_MAX = SCREEN_HEIGHT * 2;
export const PREVIEW_PIXEL_WIDTH = DEFAULT_PREVIEW_PIXEL_WIDTH;
export const PREVIEW_PIXEL_HEIGHT = DEFAULT_PREVIEW_PIXEL_HEIGHT;
export const STORAGE_KEY_SETS = 'setsData';
export const STORAGE_KEY_CROP = 'cropData';
export const COLOR_DELTA = Math.round(256 * 0.05); // Допуск 5% для цветового компонента
export const ASM_NEW_LINE = '\r\n';
export const ASM_LINE_PREFIX = '\t';
export const ASM_VALUES_PREFIX = '\t';
export const ASM_VALUES_GLUE = ',';
