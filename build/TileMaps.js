import EnemyVirus from './EnemyVirus.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';
export default class TileMaps {
    tileSize;
    cookiesDot;
    blankDot;
    wall;
    portal;
    gameMap;
    game;
    activeMap;
    enemies;
    player;
    constructor(game) {
        this.game = game;
        this.tileSize = 32;
        this.cookiesDot = new Image();
        this.cookiesDot.src = './assets/img/CookieDot.png';
        this.blankDot = new Image();
        this.blankDot.src = './assets/img/BlankDot.png';
        this.wall = new Image();
        this.wall.src = './assets/img/Wall.png';
        this.portal = new Image();
        this.portal.src = './assets/img/Portal.png';
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        this.activeMap = 1;
        this.enemies = [];
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
                else if (tile === 5) {
                    this.drawBlank(ctx, column, row, this.tileSize);
                }
                else if (tile === 9) {
                    this.drawPortal(ctx, column, row, this.tileSize);
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
    drawPortal(ctx, column, row, size) {
        ctx.drawImage(this.portal, (column * this.tileSize), (row * this.tileSize), size, size);
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
    getEnemies(velocity) {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                if (tile === 3) {
                    this.gameMap[this.activeMap].setGameMap(row, column, 0);
                    return new EnemyVirus(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this.gameMap[this.activeMap], this);
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
                case MovingDirection.getMDRight():
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.getMDLeft():
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.getMDUp():
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.getMDDown():
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
                default:
                    break;
            }
            const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
            if (tile === 1 || tile === 42) {
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
    teleportPlayer(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 9) {
                return this.gameMap[this.activeMap].getGameMap()[row].length;
            }
        }
        return null;
    }
}
//# sourceMappingURL=TileMaps.js.map