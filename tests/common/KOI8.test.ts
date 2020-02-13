import {getKOI8Bytes, getLatUpperCaseString, getStringFromKOI8Bytes} from '@common/KOI8';

test('KOI8 - getKOI8Bytes', () => {
    const inputStr = ' .09AaZzАаЯяЮюЪъЁё\u0007\u04d8';
    const resultArr = [32, 46, 48, 57, 65, 97, 90, 122, 225, 193, 241, 209, 224, 192, 255, 223, 229, 197, 32, 32];
    expect(getKOI8Bytes(inputStr)).toEqual(resultArr);
});

test('KOI8 - getStringFromKOI8Bytes', () => {
    const inputArr = [32, 46, 48, 57, 65, 97, 90, 122, 225, 193, 241, 209, 224, 192, 255, 223, 7, 128];
    const resultStr = ' .09AaZzАаЯяЮюЪъ  ';
    expect(getStringFromKOI8Bytes(inputArr)).toBe(resultStr);
});

test('KOI8 - getLatUpperCaseString', () => {
    const inputArr = [32, 46, 48, 57, 65, 97, 90, 122, 225, 193, 241, 209, 224, 192, 255, 223, 7, 128];
    const resultStr = ' .09AAZZAAQQ@@__  ';
    expect(getLatUpperCaseString(inputArr)).toBe(resultStr);
});
