import {
    COLORS,
    PALETTES,
    COLOR_DELTA
} from './conf';
import {
    TColorToIndex,
    TColorToPalettes,
    TColorToComponents,
    IColorComponentsInterval, IColorComponents
} from './interfaces';

const colorToIndexByPalette: TColorToIndex[] = PALETTES.map((colors) => {
    return colors.reduce((acc: TColorToIndex, color, index) => {
        acc[color.toLowerCase()] = index + 1;
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

export {
    colorToIndexByPalette,
    colorToPalettes,
    colorToComponentsWithDelta,
    findColor
};
