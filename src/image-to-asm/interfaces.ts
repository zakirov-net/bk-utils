import Converter from './Converter';

export interface IConverterOrError {
    error: string | undefined;
    converter: Converter | undefined;
}
export interface IImageSize {
    width: number;
    height: number;
}

export interface ICropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ICropAreaInterval {
    xBegin: number;
    xEnd: number;
    yBegin: number;
    yEnd: number;
}

export interface IColorComponents {
    r: number;
    g: number;
    b: number;
}

export interface IColorComponentsInterval {
    rMin: number;
    rMax: number;
    gMin: number;
    gMax: number;
    bMin: number;
    bMax: number;
}

export type TColorToIndex = Record<string, number>;
export type TColorToStat = Record<string, number>;
export type TPaletteToStat = Record<string, number>;
export type TPalettesList = Array<number>;
export type TColorToPalettes = Record<string, TPalettesList>;
export type TColorToComponents = Record<string, IColorComponentsInterval>;
export type TPixelsList = Array<string | null>;
