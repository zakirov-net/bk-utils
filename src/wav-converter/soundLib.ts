import {
    AFTER_TUNE,
    BIT_0,
    BIT_1,
    SYNCHRO_LONG,
    SYNCHRO_SHORT,
    TUNE,
    TUNE_COUNT,
    TUNE_COUNT_END,
    TUNE_COUNT_SECOND, TURBO_AFTER_TUNE, TURBO_BIT_0, TURBO_BIT_1, TURBO_TUNE, TURBO_TUNE_COUNT, TURBO_TUNE_COUNT_END
} from './conf';
import Binary from '../common/Binary';
import BKBinary from '../common/BKBinary';

/**
 * Функция преобразования бинарных данных в тело wav-файла
 */
export function binaryToSoundBytes(binary: BKBinary, speedBoost: boolean, isTurbo: boolean = false): Binary {
    const soundBytes = new Binary([], {expandBytes: 16 * 1024});
    const push = getPushFunction(soundBytes, !!isTurbo);
    for (let i = 0; i < TUNE_COUNT; i++) {
        push(TUNE);
    }
    push(AFTER_TUNE);
    push(BIT_1);
    for (let i = 0; i < TUNE_COUNT_SECOND; i++) {
        push(TUNE);
    }
    push(AFTER_TUNE);
    push(BIT_1);
    let synchro = speedBoost ? SYNCHRO_SHORT : SYNCHRO_LONG;
    const binaryLength = binary.length;
    for (let i = 0; i < binaryLength; i++) {
        if (i === 20) {
            // после заголовков
            for (let j = 0; j < TUNE_COUNT_SECOND; j++) {
                push(TUNE);
            }
            push(AFTER_TUNE);
            push(BIT_1);
        } else if (i === binaryLength - 2) {
            // для контрольной суммы - длинный синхроимпульс
            synchro = SYNCHRO_LONG;
        }
        let byte = binary.getByte(i);
        for (let bit = 1; bit < 255; bit <<= 1) {
            push(synchro);
            push(byte & bit ? BIT_1 : BIT_0);
        }
    }
    if (!isTurbo) {
        for (let i = 0; i < TUNE_COUNT_END; i++) {
            push(TUNE);
        }
    }
    return soundBytes;
}

// Преобразование в байты wav-файла части в турбо-режиме
export function binaryToSoundBytesTurbo(binary: BKBinary): Binary {
    const soundBytes = new Binary([], {expandBytes: 16 * 1024});
    const push = getPushFunction(soundBytes);
    const newBinary = new BKBinary(binary.sliceUint8Array(4));
    const checkSum = newBinary.getCheckSum();
    newBinary.pushWord(checkSum);
    for (let i = 0; i < TURBO_TUNE_COUNT; i++) {
        push(TURBO_TUNE);
    }
    push(TURBO_AFTER_TUNE);
    for (let i = 0; i < newBinary.length; i++) {
        let byte = newBinary.getByte(i);
        for (let bit = 1; bit < 255; bit <<= 1) {
            push(byte & bit ? TURBO_BIT_1 : TURBO_BIT_0);
        }
    }
    for (let i = 0; i < TURBO_TUNE_COUNT_END; i++) {
        push(TURBO_TUNE);
    }

    return soundBytes;
}

/**
 * Чисто для упрощения кода вставки в wav, может отдавать функцию, удваивающую вставку для турбо-режима
 */
function getPushFunction(binary: Binary, double: boolean = false): (bytes: ArrayLike<number>) => void {
    if (double) {
        return (bytes: ArrayLike<number>) => {
            for (let i = 0; i < bytes.length; i++) {
                binary.push(bytes[i], bytes[i]);
            }
        }
    } else {
        return (bytes: ArrayLike<number>) => {
            binary.pushArray(bytes);
        }
    }
}
