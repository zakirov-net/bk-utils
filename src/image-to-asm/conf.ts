import {
    DEFAULT_PREVIEW_PIXEL_HEIGHT,
    DEFAULT_PREVIEW_PIXEL_WIDTH
} from '../common/constants';

export const PREVIEW_PIXEL_WIDTH = DEFAULT_PREVIEW_PIXEL_WIDTH;
export const PREVIEW_PIXEL_HEIGHT = DEFAULT_PREVIEW_PIXEL_HEIGHT;
export const STORAGE_KEY_SETS = 'setsData';
export const STORAGE_KEY_CROP = 'cropData';
export const COLOR_DELTA = Math.round(256 * 0.05); // Допуск 5% для цветового компонента
