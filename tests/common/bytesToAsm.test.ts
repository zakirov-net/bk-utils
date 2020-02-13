import bytesToAsm from '@common/bytesToAsm';
import {OUTPUT_TYPES} from '@common/constants';
import {ASM_VALUES_PREFIX} from '@image-to-asm/conf';

test('bytesToAsm', () => {
    const bytes = new Uint8Array([255, 255, 1, 0, 228]); // 228 - точки 00, 01, 10, 11
    const bytePrefix = '.BYTE' + ASM_VALUES_PREFIX;
    const wordPrefix = '.WORD' + ASM_VALUES_PREFIX;
    expect(bytesToAsm(bytes, OUTPUT_TYPES.BYTE, 8)).toBe(bytePrefix + '377,377,001,000,344');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.WORD, 8)).toBe(wordPrefix + '177777,000001,000344');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.BYTE, 10)).toBe(bytePrefix + '255.,255.,001.,000.,228.');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.WORD, 10)).toBe(wordPrefix + '65535.,00001.,00228.');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.BYTE, 16)).toBe(bytePrefix + '0xff,0xff,0x01,0x00,0xe4');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.WORD, 16)).toBe(wordPrefix + '0xffff,0x0001,0x00e4');
    expect(bytesToAsm(bytes, OUTPUT_TYPES.BYTE, 2)).toBe(
        bytePrefix + '0b11111111,0b11111111,0b00000001,0b00000000,0b11100100'
    );
    expect(bytesToAsm(bytes, OUTPUT_TYPES.WORD, 2)).toBe(
        wordPrefix + '0b1111111111111111,0b0000000000000001,0b0000000011100100'
    );
});
