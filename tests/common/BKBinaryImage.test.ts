import BKBinaryImage from '@common/BKBinaryImage';

test('BKBinaryImage - createImage', () => {
    const binaryImage = BKBinaryImage.createImage(3, 2);
    expect(binaryImage).toBeInstanceOf(BKBinaryImage);
    expect(binaryImage.width).toBe(3);
    expect(binaryImage.height).toBe(2);
    const resultArray = new Uint8Array([0, 0, 0, 0, 0, 0]);
    expect(binaryImage.getUint8Array()).toEqual(resultArray);
});

test('BKBinaryImage - crop', () => {
    const imageBytes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const binaryImage = new BKBinaryImage(imageBytes, {width: 3, height: 3});
    const newImage = binaryImage.crop({x: 1, y: 1, width: 2, height: 1});
    expect(newImage).toBeInstanceOf(BKBinaryImage);
    expect(newImage.width).toBe(2);
    expect(newImage.height).toBe(1);
    const resultArray = new Uint8Array([4, 5]);
    expect(newImage.getUint8Array()).toEqual(resultArray);
});
