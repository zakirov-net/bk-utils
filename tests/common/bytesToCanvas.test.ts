import bytesToCanvas from '@common/bytesToCanvas';
import {PIXELS_PER_BYTE_COLOR} from '@common/constants';
import MockCanvas from '../_mocks/MockCanvas';
import MockCanvasContext2D from '../_mocks/MockCanvasContext2D';

test('bytesToCanvas', () => {
    const pixelWidth = 1;
    const pixelHeight = 1;
    const bytes = new Uint8Array([
        12, // точки 00, 11 (красный)
        129 // точки 01 (синий), две черные, 10 (зеленый)
    ]);
    const paletteId = 0;
    const mockCanvas = new MockCanvas() as any as HTMLCanvasElement;
    bytesToCanvas(bytes, mockCanvas, {bytesPerLine: 1, pixelWidth, pixelHeight, paletteId});
    expect(mockCanvas.width).toBe(PIXELS_PER_BYTE_COLOR * pixelWidth); // 4
    expect(mockCanvas.height).toBe(2 * pixelHeight);
    const resultFillActions = [
        [ 'fillRect', '#000', 0, 0, PIXELS_PER_BYTE_COLOR * pixelWidth, 2 * pixelHeight ], // Полное заполнение черным
        [ 'fillRect', '#FF0000', 1 * pixelWidth, 0, 1 * pixelWidth, 1 * pixelHeight ], // Красная точка 1,0
        [ 'fillRect', '#0000FF', 0, 1 * pixelHeight, 1 * pixelWidth, 1 * pixelHeight ], // Синяя точка 0,1
        [ 'fillRect', '#00FF00', 3 * pixelWidth, 1 * pixelHeight, 1 * pixelWidth, 1 * pixelHeight ] // Зеленая точка 1,1
    ];
    const mockContext = mockCanvas.getContext('2d') as any as MockCanvasContext2D;
    expect(mockContext.getAllMockActions()).toEqual(resultFillActions);
});