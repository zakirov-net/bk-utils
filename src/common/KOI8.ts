const CHARS_LIST = 'юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ';

export function getKOI8Bytes(text: string): number[] {
    const bytes: number[] = [];
    for (let i = 0; i < text.length; i++) {
        let code: number = text.charCodeAt(i);
        if (code < 32) {
            code = 32;
        } else if (code > 127) {
            let char: string = text[i];
            let index: number = CHARS_LIST.indexOf(char);
            if (index > -1) {
                code = 192 + index;
            } else if (char === 'Ё') {
                code = 229; // Е
            } else if (char === 'ё') {
                code = 197; // е
            } else {
                code = 32;
            }
        }
        bytes.push(code);
    }

    return bytes;
}

export function getStringFromKOI8Bytes(bytes: ArrayLike<number>): string {
    let text = '';
    for (let i = 0; i < bytes.length; i++) {
        let char = ' ';
        let code: number = bytes[i];
        if (code > 32 && code < 128) {
            char = String.fromCharCode(code);
        } else if (code >= 192 && code <= 255) {
            char = CHARS_LIST[code - 192];
        }
        text += char;
    }
    return text;
}

export function getLatUpperCaseString(bytes: ArrayLike<number>): string {
    let text = '';
    for (let i = 0; i < bytes.length; i++) {
        let char = ' ';
        let code: number = bytes[i];
        if (code >= 96) { // Начиная с маленьких латинских букв
            code &= ~0o240; // BIC #240,code
        }
        if (code > 32 && code < 96) {
            char = String.fromCharCode(code);
        }
        text += char;
    }
    return text;
}
