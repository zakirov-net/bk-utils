import {
    PREVIEW_PIXEL_WIDTH,
    PREVIEW_PIXEL_HEIGHT,
    STORAGE_KEY_SETS,
    STORAGE_KEY_CROP
} from './image-to-asm/conf';
import {
    PALETTES,
    OUTPUT_TYPES,
    RADIX_LIST,
    SCREEN_WIDTH_IN_BYTES,
    SCREEN_HEIGHT,
    PIXELS_PER_BYTE_COLOR
} from './common/constants';
import Vue from 'vue';
import createConverter from './image-to-asm/createConverter';
import {ICropArea} from './common/BKBinaryImage';
import storage from './common/storage';

new Vue({
    el: '#app',
    data: {
        showPalettes: false,
        palette: '00',
        outputType: OUTPUT_TYPES.WORD,
        radix: '8',
        insertSize: true,
        error: '',
        showImage: false,
        matchedPalettes: null,
        result: '',
        imageSize: null,
        useCrop: false,
        crop: {
            x: 0,
            y: 0,
            width: SCREEN_WIDTH_IN_BYTES,
            height: SCREEN_HEIGHT
        }
    },
    /**
     * Инициализация компонента
     */
    created: function() {
        const cropData = storage.load(STORAGE_KEY_CROP);
        if (cropData) {
            Object.keys(this.crop).forEach(field => {
                if (field in cropData) {
                    this.crop[field] = parseInt(cropData[field], 10) || 0;
                }
            });
        }
        const setsData = storage.load(STORAGE_KEY_SETS);
        if (setsData) {
            if (setsData.outputType && setsData.outputType in OUTPUT_TYPES) {
                this.outputType = setsData.outputType;
            }
            if (setsData.radix && RADIX_LIST.indexOf(setsData.radix) > -1) {
                this.radix = setsData.radix;
            }
            if ('insertSize' in setsData) {
                this.insertSize = !!setsData.insertSize;
            }
        }
    },

    computed: {
        mainPalette: function() {
            return Array.isArray(this.matchedPalettes) && this.matchedPalettes.length ?
                this.matchedPalettes[0] : null;
        },
        alsoPalettes: function() {
            return Array.isArray(this.matchedPalettes) ?
                this.matchedPalettes.slice(1) : [];
        },
        palettesList: function() {
            return PALETTES;
        },
        radixList: function() {
            return RADIX_LIST;
        },
        outputTypesList: function() {
            return Object.keys(OUTPUT_TYPES);
        },
        maxCropWidth: function() {
            return this.imageSize ? Math.ceil(this.imageSize.width / PIXELS_PER_BYTE_COLOR) : 0;
        },
        maxCropHeight: function() {
            return this.imageSize ? this.imageSize.height : 0;
        },
        cropCorrect: function(): ICropArea {
            const crop = this.crop;
            if (!this.imageSize) return crop;
            const x = getValue('x', this.maxCropWidth);
            const y = getValue('y', this.maxCropHeight);
            const width = getValue('width', this.maxCropWidth - x);
            const height = getValue('height', this.maxCropHeight - y);
            return {x, y, width, height};

            function getValue(field, max) {
                let value = parseInt(crop[field], 10);
                if (value < 0) value = 0;
                else if (value > max) value = max;
                return value;
            }
        },
        /**
         * Расчет стилей для визуального отображения обрезания
         */
        cropStyles: function() {
            if (!this.imageSize) return;
            const crop = this.cropCorrect;
            const imageWidth = this.maxCropWidth * PIXELS_PER_BYTE_COLOR;
            let right = imageWidth - (crop.x + crop.width) * PIXELS_PER_BYTE_COLOR;
            if (right < 0) right = 0;
            const bottom = this.maxCropHeight - crop.height - crop.y;
            let left = crop.x * PIXELS_PER_BYTE_COLOR;
            if (left > imageWidth) left = imageWidth;
            return {
                borderWidth: (crop.y * PREVIEW_PIXEL_HEIGHT) + 'px ' +
                    (right * PREVIEW_PIXEL_WIDTH) + 'px ' +
                    (bottom * PREVIEW_PIXEL_HEIGHT) + 'px ' +
                    (left * PREVIEW_PIXEL_WIDTH) + 'px'
            };
        }
    },

    methods: {
        paletteWithZero: function(pal: number): string {
            return (pal < 10 ? '0' : '') + pal;
        },

        /**
         * Белый или черный цвет текста в ячейке таблицы палитр в зависимости от цвета фона
         */
        getTdTextColor: function(color: string): string {
            // Если зеленый компонент цвета нулевой, то считаем это темным цветом и пишем по нему белым
            return color.substr(2, 2) === '00' ? '#FFF' : '#000';
        },

        /**
         * Обработчик события выбора файла
         */
        fileChanged: function(event) {
            this.error = '';
            this.showImage = false;
            this.matchedPalettes = null;
            this.converter = null;
            this.result = '';
            this.$refs.resultImage.innerHTML = '';
            this.useCrop = false;
            this.imageSize = null;
            const file = event.target.files[0];
            if (!file) return;
            const img = this.$refs.image;
            createConverter(file, img, this.$refs.resultImage).then(result => {
                this.showImage = true;
                if (result.error) {
                    this.error = result.error;
                } else {
                    this.matchedPalettes = result.converter.getMatchedPalettes();
                    if (!this.matchedPalettes.length) {
                        this.error = 'Не удалось определить палитру, это не подходящий для БК рисунок';
                    } else {
                        this.converter = result.converter;
                        this.imageSize = this.converter.getSize();
                        this.crop = this.cropCorrect;
                        this.palette = this.matchedPalettes[0];
                        this.convertFile();
                    }
                }
            });
        },

        /**
         * Конвертирование файла в код и отрисовка превьюшки
         */
        convertFile: function() {
            if (!this.converter) return;
            const paletteId = +this.palette;
            if (this.useCrop) {
                this.crop = this.cropCorrect;
                storage.save(STORAGE_KEY_CROP, this.crop);
            }
            storage.save(STORAGE_KEY_SETS, {
                outputType: this.outputType,
                radix: this.radix,
                insertSize: this.insertSize
            });
            this.result = this.converter.getSourceText(
                paletteId,
                this.outputType,
                +this.radix,
                this.insertSize,
                this.useCrop ? this.crop : null
            );

        },

        setPalette: function(palette: number | string) {
            this.palette = typeof palette === 'number' ? this.paletteWithZero(palette) : palette;
        },

        resetCrop: function() {
            this.crop = {
                x: 0,
                y: 0,
                width: this.maxCropWidth,
                height: this.maxCropHeight
            };
            storage.remove(STORAGE_KEY_CROP);
            this.convertFile();
        },

        copyResult: function() {
            this.$refs.result.select();
            document.execCommand('copy');
        }
    },

    watch: {
        palette: function() {
            this.convertFile();
        },
        outputType: function() {
            this.convertFile();
        },
        radix: function() {
            this.convertFile();
        },
        insertSize: function() {
            this.convertFile();
        },
        useCrop: function() {
            this.convertFile();
        }
    }
});
