import BKBinaryImage, {ICropArea} from '@common/BKBinaryImage';
import {
    ASM_LINE_PREFIX,
    ASM_NEW_LINE,
    ASM_VALUES_GLUE,
    ASM_VALUES_PREFIX
} from '@image-to-asm/conf';
import binaryToAsmText from '@image-to-asm/binaryToAsmText';
import {OUTPUT_TYPES} from '@common/constants';

const binaryImage = new BKBinaryImage([213, 59, 187, 245, 7, 142], {width: 3, height: 2});

test('binaryToAsmText - byte, word', () => {
    const resultTextByte = ASM_LINE_PREFIX + '.BYTE' + ASM_VALUES_PREFIX + ['325','073','273'].join(ASM_VALUES_GLUE) +
        ASM_NEW_LINE + ASM_LINE_PREFIX + '.BYTE' + ASM_VALUES_PREFIX + ['365','007','216'].join(ASM_VALUES_GLUE);
    expect(binaryToAsmText(binaryImage, OUTPUT_TYPES.BYTE, 8, false, null)).toBe(resultTextByte);

    const resultTextWord = ASM_LINE_PREFIX + '.WORD' + ASM_VALUES_PREFIX + ['000002','000002'].join(ASM_VALUES_GLUE) +
        ASM_NEW_LINE + ASM_LINE_PREFIX + '.WORD' + ASM_VALUES_PREFIX + ['035725','000273'].join(ASM_VALUES_GLUE) +
        ASM_NEW_LINE + ASM_LINE_PREFIX + '.WORD' + ASM_VALUES_PREFIX + ['003765','000216'].join(ASM_VALUES_GLUE);
    expect(binaryToAsmText(binaryImage, OUTPUT_TYPES.WORD, 8, true, null)).toBe(resultTextWord);
});

test('binaryToAsmText - crop', () => {
    const cropArea: ICropArea = {x: 1, y: 1, width: 2, height: 1};
    const resultTextByte = ASM_LINE_PREFIX + '.WORD' + ASM_VALUES_PREFIX + ['00002.','00001.'].join(ASM_VALUES_GLUE) +
        ASM_NEW_LINE + ASM_LINE_PREFIX + '.BYTE' + ASM_VALUES_PREFIX + ['007.','142.'].join(ASM_VALUES_GLUE);
    expect(binaryToAsmText(binaryImage, OUTPUT_TYPES.BYTE, 10, true, cropArea)).toBe(resultTextByte);
});
