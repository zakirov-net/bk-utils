import Binary from '@common/Binary';

export const BLOCK_SIZE = 512;

export default class Disk {
    _binary: Binary;

    constructor(input: ArrayLike<number>);
    constructor(input: number);

    constructor(input: any) {
        this._binary = new Binary(
            typeof input === 'number' ? input * BLOCK_SIZE : input
        );
    }

    read(blockIndex: number, blocksCount: number = 1): Uint8Array {
        return this._binary.sliceUint8Array(
            blockIndex * BLOCK_SIZE,
            (blockIndex + blocksCount) * BLOCK_SIZE
        );
    }

    write(blockIndex: number, data: ArrayLike<number>): this {
        const binary = this._binary;
        const length = data.length;
        const blocksCount = Math.ceil(length / BLOCK_SIZE);
        const needLength = (blockIndex + blocksCount) * BLOCK_SIZE;

        // Если бинарные данные меньше нужного
        if (binary.length < needLength) {
            // TODO Сделать в Binary метод увеличения размера
            binary.pushArray(new Uint8Array(needLength - binary.length));
        }
        binary.setArray(blockIndex * BLOCK_SIZE, data);
        // Добиваем последний блок нулями, если нужно
        const lengthMod = length % BLOCK_SIZE;
        if (lengthMod) {
            const zeroPadSize = BLOCK_SIZE - lengthMod;
            binary.setArray(
                blockIndex * BLOCK_SIZE + length,
                new Uint8Array(zeroPadSize)
            );
        }
        return this;
    }

    getData(): Uint8Array {
        return this._binary.getUint8Array();
    }
}
