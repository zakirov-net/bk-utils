export interface IBKBinaryOptions {
    expandBytes? : number;
}

/**
 * Класс БКшных бинарников
 */
export default class BKBinary {
    protected _length: number;
    protected _data: Uint8Array;
    protected readonly _expandBytes: number;

    constructor(input: ArrayLike<number>, options?: IBKBinaryOptions);
    constructor(input: number, options?: IBKBinaryOptions);

    constructor(
        input: any,
        {
            expandBytes = 256
        }: IBKBinaryOptions = {}
    ) {
        this._data = new Uint8Array(input);
        this._length = this._data.length;
        this._expandBytes = expandBytes;
    }

    get length(): number {
        return this._length;
    }

    getByte(index: number): number {
        return this._data[index];
    }

    setByte(index: number, byte: number): this {
        this._data[index] = byte;
        return this;
    }

    push(...bytes: Array<number>): this {
        return this.pushArray(bytes, false);
    }

    pushOnce(...bytes: Array<number>): this {
        return this.pushArray(bytes, true);
    }

    pushArray(bytes: ArrayLike<number>, once?: boolean): this {
        const array = new Uint8Array(bytes);
        let data = this._data;
        if (this._length + array.length > data.length) {
            const delta = (once || array.length > this._expandBytes) ? array.length : this._expandBytes;
            data = new Uint8Array(this._length + delta);
            data.set(this._data);
            this._data = data;
        }
        data.set(array, this._length);
        this._length += array.length;
        return this;
    }

    insert(index: number, ...bytes: Array<number>): this {
        return this.insertArray(index, bytes);
    }

    insertArray(index: number, array: ArrayLike<number>): this {
        const data = new Uint8Array(this._data.length + array.length);
        data.set(this._data.subarray(0, index));
        data.set(new Uint8Array(array), index);
        data.set(this._data.subarray(index), index + array.length);
        this._data = data;
        this._length += array.length;
        return this;
    }

    insertByte(index: number, byte: number): this {
        return this.insertArray(index, [byte]);
    }

    insertWord(index: number, word: number): this {
        this.insertArray(index, [0, 0]);
        return this.setWord(index, word);
    }

    getWord(index: number): number {
        return this._data[index] + (this._data[index + 1] << 8);
    }

    setWord(index: number, word: number): this {
        this._data[index] = word & 0xff;
        this._data[index + 1] = (word >> 8) & 0xff;
        return this;
    }

    getUint8Array(): Uint8Array {
        return this.sliceUint8Array(0, this._length);
    }

    sliceUint8Array(begin: number, end: number): Uint8Array {
        return this._data.subarray(begin, end);
    }

    setBit(index: number, bitPosition: number, bitValue: 0|1 = 1): this {
        return this._setBits(index, bitValue, bitPosition, 1);
    }

    setBitsPair(index: number, bitsPosition: number, bitsValue: 0|1|2|3 = 3): this {
        return this._setBits(index, bitsValue, bitsPosition * 2, 3);
    }

    protected _setBits(index: number, bitsValue: 0|1|2|3, bitsPosition: number, clearMask: 1|3): this {
        const useWord = bitsPosition > 7;
        let value: number = useWord ? this.getWord(index) : this.getByte(index);
        value &= ~(clearMask << bitsPosition);
        value |= (bitsValue << bitsPosition);
        if (useWord) {
            this.setWord(index, value);
        } else {
            this.setByte(index, value);
        }
        return this;
    }
}
