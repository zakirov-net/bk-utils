import pixelsToBinary from '../../src/image-to-asm/pixelsToBinary';
import BKBinaryImage from '../../src/common/BKBinaryImage';

test('pixelsToBinary', () => {
    const pixels = [
        null /*black*/, 'ff0000' /*red*/,
        '00ff00' /*green*/, '0000ff' /*blue*/
    ];
    const resultBinArray = new Uint8Array([
        0 /*black*/ | (3 /*red*/ << 2), // 12
        2 /*green*/ | (1 /*blue*/ << 2) // 6
    ]);
    const binaryImage = pixelsToBinary(pixels, 2, 2, 0);
    expect(binaryImage).toBeInstanceOf(BKBinaryImage);
    expect(binaryImage.width).toBe(1);
    expect(binaryImage.height).toBe(2);
    expect(binaryImage.getUint8Array()).toEqual(resultBinArray);
});
