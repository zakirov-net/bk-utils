// Полифилл для ИЕ
if (!Uint8Array.prototype.slice) {
    Object.defineProperty(Uint8Array.prototype, 'slice', {
        value: function (begin, end)
        {
            return new Uint8Array(Array.prototype.slice.call(this, begin, end));
        }
    });
}

export interface IBinaryOptions {
    expandBytes? : number;
}

/**
 * Класс бинарных данных
 */
export default class Binary {
    protected _length: number;
    protected _data: Uint8Array;
    protected readonly _expandBytes: number;

    constructor(input: ArrayLike<number>, options?: IBinaryOptions);
    constructor(input: ArrayBuffer, options?: IBinaryOptions);
    constructor(input: number, options?: IBinaryOptions);

    constructor(
        input: any,
        {
            expandBytes = 256
        }: IBinaryOptions = {}
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


    getUint8Array(): Uint8Array {
        return this.sliceUint8Array(0, this._length);
    }

    sliceUint8Array(begin: number, end?: number): Uint8Array {
        if (typeof end === 'undefined' || end > this._length) {
            end = this._length;
        }
        return this._data.slice(begin, end);
    }
}
