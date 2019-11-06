/**
 * Класс БКшных бинарников
 */
import Binary from './Binary';

export default class BKBinary extends Binary {
    pushWord(word: number): this {
        return this.pushArray([word & 0xff, (word >> 8) & 0xff]);
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

    getCheckSum(offset: number = 0): number {
        let checkSum = 0;
        let data = this._data;
        const length = this._length;
        for (let i = offset; i < length; i++) {
            checkSum += data[i];
            if (checkSum > 65535) { // переполнение
                checkSum -= 65536;
                checkSum++;
            }
        }
        return checkSum;
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
