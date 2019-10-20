import {
    getColorToIndexByPalette,
    getMatchedPalettes,
    getPixels
} from '../../src/image-to-asm/colorsLib';

test('getPixels', () => {
    const imageData = new Uint8ClampedArray([
        0, 0, 0, 255,
        255, 0, 0, 0,
        0, 255, 0, 1,
        0, 0, 255, 2
    ]);
    const resultPixels = [null, 'ff0000', '00ff00', '0000ff'];

    expect(getPixels(imageData)).toEqual(resultPixels);
});

test('getMatchedPalettes - Пустой рисунок', () => {
    const pixels = [null, null, '333333', 'aaaaaa'];
    expect(getMatchedPalettes(pixels)).toEqual([]);
});

test('getMatchedPalettes - RGB - единственная палитра', () => {
    const pixels = ['ff0000', '00ff00', '0000ff'];
    const resultPalettes = ['00'];
    expect(getMatchedPalettes(pixels)).toEqual(resultPalettes);
});

test('getMatchedPalettes - Зеленый цвет - несколько палитр', () => {
    const pixels = [null, '00ff00' ,null];
    const resultPalettes = ['00', '03', '12', '14', '15'];
    expect(getMatchedPalettes(pixels)).toEqual(resultPalettes);
});

test('getColorToIndexByPalette', () => {
    const resultColorToIndex = {'00ffff': 1, '00ff00': 2, 'ffffff': 3};
    expect(getColorToIndexByPalette(15)).toEqual(resultColorToIndex);
});

test('getColorToIndexByPalette - Ч/Б палитра 05', () => {
    const resultColorToIndex = {'ffffff': 3};
    expect(getColorToIndexByPalette(5)).toEqual(resultColorToIndex);
});