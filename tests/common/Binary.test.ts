import Binary from '@common/Binary';

test('Binary - create, byte, slice', () => {
    const binary = new Binary(3);
    expect(binary.length).toBe(3);
    const resultArray = new Uint8Array([0, 0, 0]);
    expect(binary.getUint8Array()).toEqual(resultArray);
    binary.setByte(0, 100);
    binary.setByte(2, 255);
    expect(binary.getByte(0)).toBe(100);
    expect(binary.getByte(1)).toBe(0);
    expect(binary.getByte(2)).toBe(255);
    const resultSlicedArray = new Uint8Array([0, 255]);
    expect(binary.sliceUint8Array(1, 3)).toEqual(resultSlicedArray);
});

test('Binary - push, insert', () => {
    const binary = new Binary(1); // [0]
    binary.push(1, 2);
    expect(binary.length).toBe(3);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([0, 1, 2]));
    binary.insert(0, 5, 6, 7);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([5, 6, 7, 0, 1, 2]));
    binary.insertArray(4, [8]);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([5, 6, 7, 0, 8, 1, 2]));
    binary.insertByte(0, 9);
    expect(binary.getUint8Array()).toEqual(new Uint8Array([9, 5, 6, 7, 0, 8, 1, 2]));
});

