import BKBinary from './BKBinary';

interface IBinaryOrError {
    binary: BKBinary;
    error: string | undefined;
}

export default function filedataToBinary(
    data: ArrayBuffer,
    addrMin: number = 0o320,
    addrMax: number = 0o177600
): IBinaryOrError {
    let binary = new BKBinary(data);
    let error: string;
    if (binary.length < 6) {
        error = 'Слишком короткий bin-файл';
    } else {
        const address = binary.getWord(0);
        const size = binary.getWord(2);
        if (size !== binary.length - 4) {
            error = 'Некорректный размер';
        } else if (address < addrMin) {
            error = 'Адрес загрузки меньше ' + addrMin.toString(8);
        } else if (address >= addrMax) {
            error = 'Адрес загрузки больше ' + addrMax.toString(8);
        } else if (address + size > addrMax) {
            error = 'Адрес + размер больше ' + addrMax.toString(8);
        }
        if (error) {
            error = 'Ошибка в bin-файле: ' + error;
        }
    }
    return {binary, error};
}
