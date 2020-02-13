import {
    LOADER_CODE,
    LOADER_OFFSET_ADDRESS,
    LOADER_OFFSET_SIZE,
    LOADER_START_ADDR_PLACEHOLDER
} from './conf';
import BKBinary from '@common/BKBinary';

/**
 * Получение массива байтов загрузчика турбо-режима со вставленным адресом и длиной основного бинарника
 */
export default function getBinaryLoader(binary: BKBinary): BKBinary {
    const loader = new BKBinary(LOADER_CODE.length * 2);
    let startOffset;
    LOADER_CODE.forEach((oct, i) => {
        const offset = i * 2;
        loader.setWord(offset, oct);
        if (!startOffset && oct === LOADER_START_ADDR_PLACEHOLDER) {
            startOffset = offset;
        }
    });
    const addr = binary.getWord(0);
    loader.setWord(LOADER_OFFSET_ADDRESS, addr);
    const size = binary.getWord(2) + 2; // 2 - контрольная сумма
    loader.setWord(LOADER_OFFSET_SIZE, size);
    if (startOffset) {
        // задаем в загрузчике адрес запуска
        let startAddr;
        if (addr < 0o1000) {
            const offset = 4 /* адрес и длина */ + (0o1000 - addr) - 4; // где в стеке взять адрес
            startAddr = binary.getWord(offset);
        } else {
            startAddr = addr;
        }
        loader.setWord(startOffset, startAddr);
    }
    return loader;
}
