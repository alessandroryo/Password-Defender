import Game from './Game.js';
export default class TileObjects {
    img;
    rowPos;
    columnPos;
    tileSize;
    game;
    constructor(imageSrc) {
        this.img = Game.loadNewImage(imageSrc);
        this.tileSize = window.innerWidth / 60;
    }
    draw(ctx, column, row) {
        ctx.drawImage(this.img, (column * this.tileSize) + (window.innerWidth / 6), (row * this.tileSize) + (window.innerHeight / 5), this.tileSize, this.tileSize);
    }
}
//# sourceMappingURL=TileObjects.js.map