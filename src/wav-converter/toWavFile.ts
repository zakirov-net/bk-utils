/**
 * Добавление заголовков wav-файла к телу
 */
export default function toWavFile(soundBytes: ArrayLike<number>, sampleRate: number): Uint8Array {
    const channelCount = 1;
    const bitsPerSample = 8;
    const subChunk1Size = 16;
    const subChunk2Size = soundBytes.length;
    const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);
    const blockAlign = channelCount * (bitsPerSample / 8);
    const byteRate = sampleRate * blockAlign;
    const header = [
        82, 73, 70, 70,               // "RIFF" in ASCII
        chunkSize & 0xff,             // Chunk Size
        (chunkSize >> 8) & 0xff,
        (chunkSize >> 16) & 0xff,
        (chunkSize >> 24) & 0xff,
        87, 65, 86, 69,               // "WAVE" in ASCII
        102, 109, 116, 32,            // "fmt " in ASCII
        subChunk1Size, 0, 0, 0,       // Sub chunk 1 size (always 16)
        1, 0,                         // Audio format (1 == PCM)
        channelCount & 0xff,          // Number Channels
        (channelCount >> 8) & 0xff,
        sampleRate & 0xff,            // Sample Rate
        (sampleRate >> 8) & 0xff,
        (sampleRate >> 16) & 0xff,
        (sampleRate >> 24) & 0xff,
        byteRate & 0xff,              // Byte Rate
        (byteRate >> 8) & 0xff,
        (byteRate >> 16) & 0xff,
        (byteRate >> 24) & 0xff,
        blockAlign & 0xff,            // Block Align
        (blockAlign >> 8) & 0xff,
        bitsPerSample & 0xff,         // Bits per sample
        (bitsPerSample >> 8) & 0xff,
        100, 97, 116, 97,             // "data" in ASCII
        subChunk2Size & 0xff,         // Sub chunk 1 size
        (subChunk2Size >> 8) & 0xff,
        (subChunk2Size >> 16) & 0xff,
        (subChunk2Size >> 24) & 0xff
    ];
    const data = new Uint8Array(header.length + soundBytes.length);
    data.set(header);
    data.set(soundBytes, header.length);
    return data;
}
