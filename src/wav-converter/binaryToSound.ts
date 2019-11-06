import {
    MODELS_LIST,
    SAMPLE_RATE_10,
    SAMPLE_RATE_11,
    SAMPLE_RATE_TURBO
} from './conf';
import getBinaryLoader from './getBinaryLoader';
import {
    binaryToSoundBytes,
    binaryToSoundBytesTurbo
} from './soundLib';
import toWavFile from './toWavFile';
import Binary from '../common/Binary';
import BKBinary from '../common/BKBinary';
import {getKOI8Bytes} from '../common/KOI8';
import {correctFileName} from '../common/fileLib';

export default function binaryToSound(
    binary: BKBinary,
    fileName: string,
    model: MODELS_LIST,
    speedBoost: boolean = false
): Uint8Array {
    let soundBytes: Binary;
    fileName = correctFileName(fileName);
    const isTurbo = model === MODELS_LIST.TURBO;
    const sampleRate = isTurbo ? SAMPLE_RATE_TURBO :
        (model === MODELS_LIST.BK11 ? SAMPLE_RATE_11 : SAMPLE_RATE_10);
    if (isTurbo) {
        if (binary.length & 1) { // если нечетная длина
            binary.push(0);
        }
        let binaryLoader = getBinaryLoader(binary);
        binaryLoader = insertFileNameAndCheckSum(binaryLoader, fileName);
        soundBytes = binaryToSoundBytes(binaryLoader, true, true);
        const payloadSoundBytes = binaryToSoundBytesTurbo(binary);
        soundBytes.pushArray(payloadSoundBytes.getUint8Array());
    } else {
        const newBinary = insertFileNameAndCheckSum(binary, fileName);
        soundBytes = binaryToSoundBytes(newBinary, speedBoost);
    }
    return toWavFile(soundBytes.getUint8Array(), sampleRate);
}

/**
 * Внедрение имени файла и контрольной суммы в бинарные данные
 */
function insertFileNameAndCheckSum(binary: BKBinary, fileName: string): BKBinary {
    const newBinary = new BKBinary(binary.getUint8Array());
    fileName = fileName.substr(0, 16).padEnd(16, ' ');
    newBinary.insertArray(4, getKOI8Bytes(fileName));
    const bodyOffset = 4 /* адрес, длина */ + 16 /* имя файла */;
    const checkSum = newBinary.getCheckSum(bodyOffset);
    newBinary.pushWord(checkSum);
    return newBinary;
}
