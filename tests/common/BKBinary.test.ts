import BKBinary from '../../src/common/BKBinary';

test('BKBinary - create, word, byte', () => {
    const binary = new BKBinary(3);
    expect(binary.length).toBe(3);
    const resultArray = new Uint8Array([0, 0, 0]);
    expect(binary.getUint8Array()).toEqual(resultArray);
    binary.setWord(0, 777);
    binary.setByte(2, 255);
    expect(binary.getByte(0)).toBe(9);
    expect(binary.getByte(1)).toBe(3);
    expect(binary.getWord(0)).toBe(777);
    expect(binary.getWord(2)).toBe(255);
    const resultSlicedArray = new Uint8Array([3, 255]);
    expect(binary.sliceUint8Array(1, 3)).toEqual(resultSlicedArray);
});

test('BKBinary - push, insert', () => {
    const binary = new BKBinary(1); // [0]
    binary.push(1, 2);
    expect(binary.length).toBe(3);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([0, 1, 2]));
    binary.insert(0, 5, 6, 7);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([5, 6, 7, 0, 1, 2]));
    binary.insertArray(4, [8]);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([5, 6, 7, 0, 8, 1, 2]));
    binary.insertByte(0, 9);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([9, 5, 6, 7, 0, 8, 1, 2]));
    binary.insertWord(2, 2826);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([9, 5, 10, 11, 6, 7, 0, 8, 1, 2]));
});

