import Game from './Game.js';
export default class TileObjects {
    img;
    rowPos;
    columnPos;
    tileSize;
    constructor(imageSrc) {
        this.img = Game.loadNewImage(imageSrc);
        this.tileSize = 32;
    }
    draw(ctx, column, row) {
        ctx.drawImage(this.img, (column * this.tileSize) + 300, (row * this.tileSize) + 200, this.tileSize, this.tileSize);
    }
}
//# sourceMappingURL=TileObjects.js.map