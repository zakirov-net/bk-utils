import {getKOI8Bytes} from '../../src/common/KOI8';

test('KOI8 - getKOI8Bytes', () => {
    const inputStr = ' .09AaZzАаЯяЮюЪъЁё\u0007\u04d8';
    const resultArr = [32, 46, 48, 57, 65, 97, 90, 122, 225, 193, 241, 209, 224, 192, 255, 223, 229, 197, 32, 32];
    expect(getKOI8Bytes(inputStr)).toEqual(resultArr);
});
