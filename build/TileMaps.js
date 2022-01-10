import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';
export default class TileMaps {
    tileSize;
    cookiesDot;
    blankDot;
    wall;
    gameMap;
    game;
    activeMap;
    movingDirection;
    constructor(game) {
        this.game = game;
        this.tileSize = 32;
        this.cookiesDot = new Image();
        this.cookiesDot.src = './assets/img/CookieDot.png';
        this.blankDot = new Image();
        this.blankDot.src = './assets/img/BlankDot.png';
        this.wall = new Image();
        this.wall.src = './assets/img/Wall.png';
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        this.activeMap = 1;
        this.movingDirection = new MovingDirection();
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
                else {
                    this.drawBlank(ctx, column, row, this.tileSize);
                }
            }
        }
    }
    drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, (column * this.tileSize), (row * this.tileSize), size, size);
    }
    drawDot(ctx, column, row, size) {
        ctx.drawImage(this.cookiesDot, (column * this.tileSize), (row * this.tileSize), size, size);
    }
    drawBlank(ctx, column, row, size) {
        ctx.drawImage(this.blankDot, (column * this.tileSize), (row * this.tileSize), size, size);
    }
    getPlayer(velocity) {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                if (tile === 2) {
                    this.gameMap[this.activeMap].getGameMap()[row][column] = 0;
                    return new Player(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this.gameMap[this.activeMap], this);
                }
            }
        }
        return null;
    }
    collideWithEnvironment(x, y, direction) {
        if (Number.isInteger(x / this.tileSize)
            && Number.isInteger(y / this.tileSize)) {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;
            switch (direction) {
                case this.movingDirection.getMDRight():
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case this.movingDirection.getMDLeft():
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case this.movingDirection.getMDUp():
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case this.movingDirection.getMDDown():
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                default:
                    break;
            }
            const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
            if (tile === 1) {
                return true;
            }
        }
        return false;
    }
    eatCookies(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 0) {
                this.gameMap[this.activeMap].getGameMap()[row][column] = 5;
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=TileMaps.js.map