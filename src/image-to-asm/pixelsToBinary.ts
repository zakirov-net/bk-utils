import BKBinaryImage from '@common/BKBinaryImage';
import {
    TPixelsList,
    getColorToIndexByPalette
} from './colorsLib';
import {PIXELS_PER_BYTE_COLOR} from '@common/constants';

/**
 * Получение объекта БКшных бинарных данных из картинки
 */
export default function pixelsToBinary(
    pixels: TPixelsList,
    width: number,
    height: number,
    paletteId: number
): BKBinaryImage {
    const colorToIndex = getColorToIndexByPalette(paletteId);
    const bytesPerLine = Math.ceil(width / PIXELS_PER_BYTE_COLOR);
    const binary = BKBinaryImage.createImage(bytesPerLine, height);
    let binaryIndex = 0;
    let i = 0;
    for (let y = 0; y < height; y++) {
        let byte = 0;
        let bitsPos = 0;
        for (let x = 0; x < width; x++) {
            let color = pixels[i++];
            if (color && (color in colorToIndex)) {
                byte |= colorToIndex[color] << bitsPos;
            }
            bitsPos += 2;
            if (bitsPos === 8) {
                binary.setByte(binaryIndex++, byte);
                byte = bitsPos = 0;
            }
        }
        if (bitsPos) {
            binary.setByte(binaryIndex++, byte);
        }
    }
    return binary;
}
