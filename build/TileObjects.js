import Game from './Game.js';
export default class TileObjects {
    img;
    rowPos;
    columnPos;
    constructor(imageSrc) {
        this.img = Game.loadNewImage(imageSrc);
    }
    getXPos() {
        return this.rowPos;
    }
    getYPos() {
        return this.columnPos;
    }
    draw(ctx, row, column, heightRatio, widthRatio, tileSizeHeight, tileSizeWidth) {
        ctx.drawImage(this.img, (row * tileSizeHeight) + heightRatio, (column * tileSizeWidth) + widthRatio, tileSizeWidth, tileSizeHeight);
    }
}
//# sourceMappingURL=TileObjects.js.map