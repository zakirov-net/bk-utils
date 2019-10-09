import {OUTPUT_TYPES} from '../common/constants';
import BKBinaryImage, {ICropArea} from '../common/BKBinaryImage';
import bytesToAsm from '../common/bytesToAsm';

/**
 * Преобразование бинарника в ассемблерный текст
 */
export default function binaryToAsmText(
    imageBinary: BKBinaryImage,
    outputType: OUTPUT_TYPES,
    radix: number,
    insertSize: boolean,
    cropArea: ICropArea | null
): string {
    const width = cropArea ? cropArea.width : imageBinary.width;
    const height = cropArea ? cropArea.height : imageBinary.height;
    if (!width || !height) return '';

    const textLines: string[] = [];
    if (insertSize) {
        const sizesLine = [
            outputType === OUTPUT_TYPES.WORD ? Math.ceil(width / 2) : width,
            height
        ];
        textLines.push(bytesToAsm(sizesLine, OUTPUT_TYPES.BYTE, radix));
    }

    const image = cropArea ? imageBinary.crop(cropArea) : imageBinary;

    for (let y = 0; y < height; y++) {
        let begin = y * width;
        const lineBytes = image.sliceUint8Array(begin, begin + width);
        textLines.push(bytesToAsm(lineBytes, outputType, radix));
    }
    return textLines.map(line => '\t' + line).join('\r\n');
}
