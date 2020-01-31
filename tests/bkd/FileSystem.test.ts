import fs from 'fs';
import createFromData from '../../src/bkd/createFromData';
import MKDOS from '../../src/bkd/fs/MKDOS';
import extractFilesDump, {dumpStruct} from '../../src/bkd/fs/MKDOS/extractFilesDump';
import createDisk from '../../src/bkd/fs/MKDOS/createDisk';
import filedataToBinary from '../../src/common/filedataToBinary';

test('FileSystem', () => {
    const FILES_DIR = __dirname + '/../_files/';

    function loadFile(file: string): Uint8Array {
        return new Uint8Array(fs.readFileSync(FILES_DIR + file));
    }

    // TODO Сделать тест
/*
    const fileSystem = createDisk();
    const {binary: bolderBin} = filedataToBinary(loadFile('BOLDER.BIN'));
    if (bolderBin) {
        const address = bolderBin.getWord(0);
        fileSystem.saveFile({
            name: 'BOLDER',
            address,
            content: bolderBin.sliceUint8Array(4)
        });
        fs.writeFileSync(FILES_DIR + 'mkdos.bkd', fileSystem.getData());
    }*/

    /*const file = loadFile('mk317.bkd');
    const {fs: filesystem, error} = createFromData<MKDOS>(file);
    const dump = extractFilesDump(filesystem, dumpStruct);
    fs.writeFileSync(FILES_DIR + 'mkdosdump.json', JSON.stringify(dump));*/
});
