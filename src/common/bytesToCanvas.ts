import {
    PALETTES,
    BITS_MASK_COLOR,
    SCREEN_WIDTH_IN_BYTES,
    DEFAULT_PREVIEW_PIXEL_HEIGHT,
    DEFAULT_PREVIEW_PIXEL_WIDTH,
    PIXELS_PER_BYTE_COLOR
} from './constants';

interface IBinaryToCanvasOptions {
    bytesPerLine?: number;
    pixelWidth?: number;
    pixelHeight?: number;
    paletteId?: number;
}

/**
 * Отрисовка массива байтов на canvas БКшными цветами в заданной палитре
 */
export default function bytesToCanvas(
    binary: Uint8Array,
    canvas: HTMLCanvasElement,
    {
        bytesPerLine = SCREEN_WIDTH_IN_BYTES,
        pixelWidth = DEFAULT_PREVIEW_PIXEL_WIDTH,
        pixelHeight = DEFAULT_PREVIEW_PIXEL_HEIGHT,
        paletteId = 0
    }: IBinaryToCanvasOptions = {}
): void {
    const linesCount = binary.length / bytesPerLine;
    const colors = PALETTES[paletteId];
    canvas.width = bytesPerLine * PIXELS_PER_BYTE_COLOR * pixelWidth;
    canvas.height = linesCount * pixelHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    for (let y = 0; y < linesCount; y++) {
        for (let x = 0; x < bytesPerLine; x++) {
            let byte = binary[i++];
            for (let p = 0; p < PIXELS_PER_BYTE_COLOR; p++) {
                const colorBits = byte & BITS_MASK_COLOR;
                byte >>= 2;
                if (colorBits) {
                    ctx.fillStyle = '#' + colors[colorBits];
                    ctx.fillRect(
                        (x * PIXELS_PER_BYTE_COLOR + p) * pixelWidth,
                        y * pixelHeight,
                        pixelWidth,
                        pixelHeight
                    );
                }
            }
        }
    }
}
