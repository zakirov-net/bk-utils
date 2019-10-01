import {
    PREVIEW_PIXEL_WIDTH,
    PREVIEW_PIXEL_HEIGHT,
    STORAGE_KEY_SETS,
    STORAGE_KEY_CROP,
    OUTPUT_TYPES,
    RADIX_LIST,
    PALETTES
} from './image-to-asm/conf';
import Vue from 'vue';
import getConverterFromFile from './image-to-asm/getConverterFromFile';
import {ICropArea} from './image-to-asm/interfaces';
import storage from './image-to-asm/storage';

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
            width: 64,
            height: 256
        }
    },
    /**
     * Инициализация компонента
     */
    created: function() {
        const cropData = storage.load(STORAGE_KEY_CROP);
        Object.keys(this.crop).forEach(field => {
            if (field in cropData) {
                this.crop[field] = parseInt(cropData[field], 10) || 0;
            }
        });
        const setsData = storage.load(STORAGE_KEY_SETS);
        if (setsData.outputType && setsData.outputType in OUTPUT_TYPES) {
            this.outputType = setsData.outputType;
        }
        if (setsData.radix && RADIX_LIST.indexOf(setsData.radix) > -1) {
            this.radix = setsData.radix;
        }
        if ('insertSize' in setsData) {
            this.insertSize = !!setsData.insertSize;
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
        maxWidth: function() {
            return this.imageSize ? Math.ceil(this.imageSize.width / 4) : 0;
        },
        maxHeight: function() {
            return this.imageSize ? this.imageSize.height : 0;
        },
        cropCorrect: function(): ICropArea {
            const crop = this.crop;
            if (!this.imageSize) return crop;
            const x = getValue('x', this.maxWidth);
            const y = getValue('y', this.maxHeight);
            const width = getValue('width', this.maxWidth - x);
            const height = getValue('height', this.maxHeight - y);
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
            const imageWidth = this.imageSize.width;
            let right = imageWidth - (crop.x + crop.width) * 4;
            if (right < 0) right = 0;
            const bottom = this.maxHeight - crop.height - crop.y;
            let left = crop.x * 4;
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
            this.lastPalette = null;
            const file = event.target.files[0];
            if (!file) return;
            const img = this.$refs.image;
            getConverterFromFile(file, img).then(result => {
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
         * Конвертирование файла в код и отрисовка превьюшки, если изменилась палитра
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
            if (paletteId !== this.lastPalette) {
                const resultImageDiv = this.$refs.resultImage;
                this.converter.drawResultImage(resultImageDiv, paletteId);
                this.lastPalette = paletteId;
            }
        },

        setPalette: function(palette) {
            this.palette = palette;
        },

        resetCrop: function() {
            this.crop = {
                x: 0,
                y: 0,
                width: this.maxWidth,
                height: this.maxHeight
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
