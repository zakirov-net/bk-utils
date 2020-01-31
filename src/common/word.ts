/**
 * Получение двухбайтного слова (LE)
 */
export function getWord(data: Uint8Array, index: number): number {
    return data[index] + (data[index + 1] << 8);
}

/**
 * Запись двухбайтного слова (LE)
 */
export function setWord(data: Uint8Array, index: number, word: number): void {
    data[index] = word & 0xff;
    data[index + 1] = (word >> 8) & 0xff;
}
