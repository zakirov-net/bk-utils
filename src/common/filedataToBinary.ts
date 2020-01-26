import BKBinary from './BKBinary';

export interface IBinaryOrError {
    binary: BKBinary;
    error: string | undefined;
}

export default function filedataToBinary(
    data: ArrayBuffer
): IBinaryOrError {
    let binary = new BKBinary(data);
    let error: string;
    if (binary.length < 6) {
        error = 'Слишком короткий bin-файл';
    } else {
        const size = binary.getWord(2);
        if (size !== binary.length - 4) {
            error = 'Файл не соответствует формату БК';
        }
    }
    return {binary, error};
}
