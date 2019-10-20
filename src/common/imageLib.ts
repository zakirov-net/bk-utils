/**
 * Отображение выбранной картинки
 */
export function setImageSrc(img: HTMLImageElement, url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve(img);
        };
        img.src = url;
    });
}

/**
 * Получение массива цветов точек изображений, по 4 элемента на точку в формате [r0, g0, b0, a0, r1, ...]
 */
export function getImageData(img: HTMLImageElement, serviceCanvas: HTMLCanvasElement): Uint8ClampedArray {
    serviceCanvas.width = img.width;
    serviceCanvas.height = img.height;
    const ctx = serviceCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, serviceCanvas.width, serviceCanvas.height).data;
}
