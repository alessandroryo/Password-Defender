import Game from './Game.js';
export default class TileObjects {
    img;
    rowPos;
    columnPos;
    tileSize;
    constructor(imageSrc) {
        this.tileSize = 32;
        this.img = Game.loadNewImage(imageSrc);
    }
    getXPos() {
        return this.rowPos;
    }
    getYPos() {
        return this.columnPos;
    }
    draw(ctx, row, column) {
        ctx.drawImage(this.img, (row * this.tileSize) + 300, (column * this.tileSize) + 200, this.tileSize, this.tileSize);
    }
}
//# sourceMappingURL=TileObjects.js.map