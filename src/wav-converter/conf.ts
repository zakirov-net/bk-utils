const LEVEL_1 = 208;
const LEVEL_1_TUNE = 200; // чтоб визуально отличать в звуковом редакторе
const LEVEL_0 = 48;

export enum MODELS_LIST {
    BK10 = 'BK10',
    BK11 = 'BK11',
    TURBO = 'TURBO'
}

export const BIT_0 = [
    LEVEL_1, LEVEL_1,
    LEVEL_0, LEVEL_0
];
export const BIT_1 = [
    LEVEL_1, LEVEL_1, LEVEL_1, LEVEL_1,
    LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0
];
export const TUNE = [
    LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0, LEVEL_0
];
export const AFTER_TUNE = [
    LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0
];
export const SYNCHRO_SHORT = [
    LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0
];
export const SYNCHRO_LONG = [
    LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0, LEVEL_0
];
export const SAMPLE_RATE_10 = 21428;
export const SAMPLE_RATE_11 = 25000;
export const SAMPLE_RATE_TURBO = 40000;
export const TUNE_COUNT = 4096;
export const TUNE_COUNT_SECOND = 10;
export const TUNE_COUNT_END = 200;

export const TURBO_TUNE_COUNT = 1024;
export const TURBO_TUNE_COUNT_END = 2;

export const TURBO_BIT_0 = [
    LEVEL_1,
    LEVEL_0, LEVEL_0
];
export const TURBO_BIT_1 = [
    LEVEL_1, LEVEL_1, LEVEL_1,
    LEVEL_0, LEVEL_0
];
export const TURBO_TUNE = [
    LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0, LEVEL_0, LEVEL_0
];
export const TURBO_AFTER_TUNE = [
    LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE, LEVEL_1_TUNE,
    LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0,
    LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0, LEVEL_0
];

// БКшный код загрузчика
export const LOADER_CODE = [
    0o000760,
    0o000302,
    0o001000,
    0o001000,
    0o001000,
    0o001000,
    0o001000,
    0o001000,
    0o001000,
    0o001000,
    0o012701,
    0o040000,
    0o012700,
    0o024102,
    0o010137,
    0o000322,
    0o010037,
    0o000324,
    0o012704,
    0o001106,
    0o012705,
    0o000400,
    0o012425,
    0o001376,
    0o005002,
    0o012703,
    0o000400,
    0o012704,
    0o177716,
    0o012705,
    0o000040,
    0o030514,
    0o001376,
    0o030514,
    0o001776,
    0o005202,
    0o030514,
    0o001375,
    0o077306,
    0o105002,
    0o000302,
    0o006302,
    0o006302,
    0o000137,
    0o000400,
    0o005003,
    0o030514,
    0o001776,
    0o005203,
    0o030514,
    0o001375,
    0o160203,
    0o100001,
    0o005403,
    0o020327,
    0o000006,
    0o003364,
    0o012703,
    0o000010,
    0o010302,
    0o030514,
    0o001776,
    0o030514,
    0o001410,
    0o030514,
    0o001406,
    0o030514,
    0o001404,
    0o030514,
    0o001376,
    0o000261,
    0o000401,
    0o000241,
    0o106011,
    0o077217,
    0o005201,
    0o077022,
    0o013705,
    0o000322,
    0o010503,
    0o013704,
    0o000324,
    0o162704,
    0o000002,
    0o005002,
    0o152502,
    0o060200,
    0o005500,
    0o077405,
    0o020041,
    0o001002,
    0o000137,
    0o001357,
    0o012701,
    0o100734,
    0o012702,
    0o000006,
    0o104020,
    0o000000
];

export const LOADER_OFFSET_ADDRESS = 22; // Где в загрузчике адрес, с учетом заголовков самого загрузчика
export const LOADER_OFFSET_SIZE = 26;
export const LOADER_START_ADDR_PLACEHOLDER = 0o001357; // в ячейку с таким содержимым засовываем адрес запуска файла
