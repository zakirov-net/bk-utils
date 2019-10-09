import {DIGITS_COUNT, OUTPUT_TYPES} from './constants';

/**
 * Получение строки кода из байтов, соответствующих этой строке
 */
export default function bytesToAsm(
    bytes: Uint8Array | number[],
    outputType: OUTPUT_TYPES = OUTPUT_TYPES.BYTE,
    radix: number = 8
): string {
    const isWord = outputType === OUTPUT_TYPES.WORD;
    const digits: number = DIGITS_COUNT[outputType][radix];
    const values: string[] = [];
    for (let i = 0; i < bytes.length; i++) {
        const value: number = bytes[i] + (isWord ? bytes[++i] << 8 : 0);
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
    return `.${ outputType }\t${ values.join(',') }`;
}