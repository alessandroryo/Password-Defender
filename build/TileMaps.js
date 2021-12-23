import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import Player from './Player.js';
export default class TileMaps {
    tileSize;
    yellowDot;
    wall;
    gameMap;
    game;
    activeMap;
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
        this.activeMap = 1;
        console.log(this.gameMap[this.activeMap]);
    }
    draw(ctx) {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
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
    getPlayer(velocity) {
        console.log(this.gameMap[this.activeMap].getGameMap().length);
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                console.log(this.gameMap[this.activeMap].getGameMap()[row].length);
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                console.log(tile);
                if (tile === 4) {
                    this.gameMap[this.activeMap].getGameMap()[row][column] = 0;
                    return new Player(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this.gameMap[this.activeMap]);
                }
            }
        }
        throw new Error('getPlayer error');
    }
}
//# sourceMappingURL=TileMaps.js.map