import fs from 'fs';
import filedataToBinary from '../../src/common/filedataToBinary';
import BKBinary from '../../src/common/BKBinary';
import binaryToSound from '../../src/wav-converter/binaryToSound';
import {MODELS_LIST} from '../../src/wav-converter/conf';

const FILES_DIR = __dirname + '/../_files/';
const FILE_NAME = 'test';

function loadFile(ext: string): Uint8Array {
    return new Uint8Array(fs.readFileSync(FILES_DIR + FILE_NAME + ext));
}

test('binaryToSound', () => {
    const binFile = loadFile('.bin');
    const binaryOrError = filedataToBinary(binFile);
    expect(binaryOrError.binary).toBeInstanceOf(BKBinary);
    expect(binaryOrError.error).toBeUndefined();
    const binary = binaryOrError.binary;
    const wavBK10 = binaryToSound(binary, FILE_NAME, MODELS_LIST.BK10, false);
    expect(wavBK10).toEqual(loadFile('-bk10.wav'));
    const wavBK10Boost = binaryToSound(binary, FILE_NAME, MODELS_LIST.BK10, true);
    expect(wavBK10Boost).toEqual(loadFile('-bk10-boost.wav'));
    const wavTurbo = binaryToSound(binary, FILE_NAME, MODELS_LIST.TURBO);
    expect(wavTurbo).toEqual(loadFile('-turbo.wav'));
});
