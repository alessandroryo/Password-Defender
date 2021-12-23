import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
export default class TileMaps {
    tileSize;
    yellowDot;
    wall;
    gameMap;
    game;
    constructor(game) {
        this.game = game;
        this.tileSize = 32;
        this.yellowDot = new Image();
        this.yellowDot.src = './assets/img/CookieDot.png';
        this.wall = new Image();
        this.wall.src = './assets/img/Wall.png';
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
    }
    draw(ctx) {
        const activeMap = 0;
        for (let row = 0; row < this.gameMap[activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[activeMap].getGameMap()[row][column];
                if (tile === 1) {
                    this.drawWall(ctx, column, row, this.tileSize);
                }
                else if (tile === 0) {
                    this.drawDot(ctx, column, row, this.tileSize);
                }
            }
        }
    }
    drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, (column * this.tileSize) + this.game.canvas.width / 3, (row * this.tileSize) + 200, size, size);
    }
    drawDot(ctx, column, row, size) {
        ctx.drawImage(this.yellowDot, (column * this.tileSize) + this.game.canvas.width / 3, (row * this.tileSize) + 200, size, size);
    }
}
//# sourceMappingURL=TileMaps.js.map