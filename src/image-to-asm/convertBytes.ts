import {DIGITS_COUNT, OUTPUT_TYPES} from './conf';
import {ICropAreaInterval} from './interfaces';

/**
 * Преобразование байтов в ассемблерный текст
 */
export default function convertBytes(
    bytes: number[],
    outputType: OUTPUT_TYPES,
    radix: number,
    insertSize: boolean,
    area: ICropAreaInterval
): string {
    const width = area.xEnd - area.xBegin;
    const height = area.yEnd - area.yBegin;
    if (!width || !height) return '';
    const bytesPerLine = Math.ceil(width / 4);
    const textLines: string[] = [];
    if (insertSize) {
        const sizesLine = [
            outputType === OUTPUT_TYPES.WORD ? Math.ceil(bytesPerLine / 2) : bytesPerLine,
            height
        ];
        textLines.push(_getValuesLine(sizesLine, OUTPUT_TYPES.BYTE, radix));
    }
    for (let line = 0; line < height; line++) {
        const lineBytes = bytes.slice(line * bytesPerLine, (line + 1) * bytesPerLine);
        textLines.push(_getValuesLine(lineBytes, outputType, radix));
    }
    return textLines.map(line => '\t' + line).join('\r\n');
}

/**
 * Получение строки кода из байтов, соответствующих этой строке
 */
function _getValuesLine(lineBytes: number[], outputType: OUTPUT_TYPES, radix: number): string {
    const isWord = outputType === OUTPUT_TYPES.WORD;
    const digits: number = DIGITS_COUNT[outputType][radix];
    const values: string[] = [];
    for (let i = 0; i < lineBytes.length; i++) {
        const value: number = lineBytes[i] + (isWord ? lineBytes[++i] << 8 : 0);
        let valueStr = value.toString(radix);
        for (let j = valueStr.length; j < digits; j++) {
            valueStr = '0' + valueStr;
        }
        if (radix === 2) {
            valueStr = '0b' + valueStr;
        } else if (radix === 16) {
            valueStr = '0x' + valueStr;
        } else if (radix === 10) {
            valueStr += '.';
        }
        values.push(valueStr);
    }
    return '.' + outputType + '\t' + values.join(',');
}