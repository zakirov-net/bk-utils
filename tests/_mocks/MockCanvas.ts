import MockCanvasContext2D from './MockCanvasContext2D';

export default class MockCanvas {
    protected _context2D;
    getContext(context: string) {
        if (context === '2d') {
            if (!this._context2D) {
                this._context2D = new MockCanvasContext2D();
            }
            return this._context2D;
        }
    }
}
