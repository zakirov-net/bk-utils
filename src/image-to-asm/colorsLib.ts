import {COLOR_DELTA} from './conf';
import {PALETTES} from '@common/constants';

export type TPixelsList = Array<string | null>;

const COLORS = ['r', 'g', 'b'];

type TColorToIndex = Record<string, number>;
type TColorToStat = Record<string, number>;
type TPalettesList = Array<number>;
type TColorToPalettes = Record<string, TPalettesList>;
type TColorToComponents = Record<string, IColorComponentsInterval>;
type TPaletteToStat = Record<string, number>;

interface IColorComponents {
    r: number;
    g: number;
    b: number;
}

interface IColorComponentsInterval {
    rMin: number;
    rMax: number;
    gMin: number;
    gMax: number;
    bMin: number;
    bMax: number;
}

const colorToIndexByPalette: TColorToIndex[] = PALETTES.map((colors) => {
    return colors.reduce((acc: TColorToIndex, color, index) => {
        if (index) { // черный цвет не нужен, родной
            acc[color.toLowerCase()] = index;
        }
        return acc;
    }, {});
});

const colorToPalettes: TColorToPalettes = colorToIndexByPalette.reduce(
    (acc: TColorToPalettes, colors, palId) => {
        return Object.keys(colors).reduce((acc, color) => {
            if (!(color in acc)) acc[color] = [];
            acc[color].push(palId);
            return acc;
        }, acc);
    }, {}
);

const colorToComponentsWithDelta: TColorToComponents =
    Object.keys(colorToPalettes).reduce(
        (acc: TColorToComponents, color) => {
            let components = [];
            for (let i = 0; i < 6; i += 2) {
                components.push(parseInt(color.substr(i, 2), 16));
            }
            acc[color] = components.reduce((res: IColorComponentsInterval, base: number, i: number) => {
                const min = base - COLOR_DELTA;
                const max = base + COLOR_DELTA;
                res[COLORS[i] + 'Min'] = min < 0 ? 0 : min;
                res[COLORS[i] + 'Max'] = max > 255 ? 255 : max;
                return res;
            }, {});

            return acc;
        },
        {}
    );

/**
 * Поиск наиболее близкого цвета в палитре БК
 */
function findColor(colorComponents: IColorComponents): string | null {
    let color: string | null = null;
    for (let clr in colorToComponentsWithDelta) {
        if (colorToComponentsWithDelta.hasOwnProperty(clr)) {
            let c: IColorComponentsInterval = colorToComponentsWithDelta[clr];
            if (
                colorComponents.r >= c.rMin && colorComponents.r <= c.rMax &&
                colorComponents.g >= c.gMin && colorComponents.g <= c.gMax &&
                colorComponents.b >= c.bMin && colorComponents.b <= c.bMax
            ) {
                color = clr;
                break;
            }
        }
    }
    return color;
}

/**
 * Получение списка из N (трех) наиболее часто встречающихся цветов на картинке
 */
function getTopColors(pixels: TPixelsList, topCount: number = 3): string[] {
    const stat: TColorToStat = pixels.reduce((acc: TColorToStat, color: string) => {
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
 * Формирование списка пикселей - массив строк с кодовым обозначением цвета ('FF0000') или null для черного цвета
 */
export function getPixels(imageData: Uint8ClampedArray): TPixelsList {
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
        } else if (!(color in colorToComponentsWithDelta)) {
            color = findColor(colorComponents);
        }
        pixels.push(color);
    }
    return pixels;
}

/**
 * Получение подходящих палитр
 */
export function getMatchedPalettes(pixels: TPixelsList): string[] {
    const topColors = getTopColors(pixels);
    const stat: TPaletteToStat = topColors
        .reduce((acc, color) => {
            if (color in colorToPalettes) {
                acc = acc.concat(colorToPalettes[color]);
            }
            return acc;
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
 * Получение хэш-таблицы для преобразования цвета в формате 'FF0000' в индекс цвета БК (0-3) в заданной палитре
 */
export function getColorToIndexByPalette(paletteId: number): TColorToIndex {
    return colorToIndexByPalette[paletteId];
}
