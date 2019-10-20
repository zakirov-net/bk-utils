export default class MockCanvasContext2D {
    public fillStyle;

    protected _actions = [];

    fillRect(x: number, y: number, w: number, h: number): void {
        this._actions.push(['fillRect', this.fillStyle, x, y, w, h]);
    }

    getAllMockActions() {
        return this._actions;
    }
};
