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