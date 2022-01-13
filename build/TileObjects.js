import Game from './Game.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
export default class TileObjects {
    img;
    rowPos;
    columnPos;
    row;
    column;
    tileSize;
    gameMap;
    activeMap;
    type;
    constructor(imageSrc) {
        this.activeMap = 0;
        this.tileSize = 32;
        this.img = Game.loadNewImage(imageSrc);
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        console.log(this.gameMap[this.activeMap].getGameMap().length);
        for (this.rowPos = 0; this.rowPos < this.gameMap[this.activeMap].getGameMap().length; this.rowPos++) {
            for (this.columnPos = 0; this.columnPos < this.gameMap[this.activeMap].getGameMap()[this.rowPos].length; this.columnPos++) {
                this.row = this.rowPos;
                this.column = this.columnPos;
            }
        }
    }
    getXPos() {
        return this.rowPos;
    }
    getYPos() {
        return this.columnPos;
    }
    draw(ctx) {
        ctx.drawImage(this.img, (this.row * this.tileSize) + 300, (this.column * this.tileSize) + 200, this.tileSize, this.tileSize);
    }
}
//# sourceMappingURL=TileObjects.js.map