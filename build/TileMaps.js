import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';
export default class TileMaps {
    tileSize;
    cookiesDot;
    powerUp;
    blankDot;
    wall;
    portal;
    passLock;
    randomBox;
    strongWall;
    VPN;
    antivirus;
    fireWall;
    gameMap;
    game;
    activeMap;
    enemies;
    player;
    constructor(game) {
        this.game = game;
        this.tileSize = 32;
        this.cookiesDot = Game.loadNewImage('./assets/img/CookieDot.png');
        this.blankDot = Game.loadNewImage('./assets/img/BlankDot.png');
        this.wall = Game.loadNewImage('./assets/img/Wall.png');
        this.portal = Game.loadNewImage('./assets/img/Portal.png');
        this.passLock = Game.loadNewImage('./assets/img/Lock-Password.png');
        this.randomBox = Game.loadNewImage('./assets/img/Random-Box.png');
        this.VPN = Game.loadNewImage('./assets/img/VPN.png');
        this.antivirus = Game.loadNewImage('./assets/img/Anti-Virus.png');
        this.fireWall = Game.loadNewImage('./assets/img/Fire-Wall.png');
        this.strongWall = Game.loadNewImage('./assets/img/Strong-Wall.png');
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        this.activeMap = 0;
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
                else if (tile === 4) {
                    this.drawRandomBox(ctx, column, row, this.tileSize);
                }
                else if (tile === 5) {
                    this.drawBlank(ctx, column, row, this.tileSize);
                }
                else if (tile === 8) {
                    this.drawLock(ctx, column, row, this.tileSize);
                }
                else if (tile === 9) {
                    this.drawPortal(ctx, column, row, this.tileSize);
                }
                else if (tile === 43) {
                    this.drawStrongWall(ctx, column, row, this.tileSize);
                }
            }
        }
        this.game.writeTextToCanvas(this.game.getUserData().getDisplayedPassword(), 939, 476, 14, 'white');
    }
    drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, (column * this.tileSize) + 300, (row * this.tileSize) + 200, size, size);
    }
    drawDot(ctx, column, row, size) {
        ctx.drawImage(this.cookiesDot, (column * this.tileSize) + 300, (row * this.tileSize) + 200, size, size);
    }
    drawBlank(ctx, column, row, size) {
        ctx.drawImage(this.blankDot, ((column * this.tileSize) + 300), ((row * this.tileSize) + 200), size, size);
    }
    drawPortal(ctx, column, row, size) {
        ctx.drawImage(this.portal, ((column * this.tileSize) + 300), ((row * this.tileSize) + 200), size, size);
    }
    drawLock(ctx, column, row, size) {
        ctx.drawImage(this.passLock, ((column * this.tileSize) + 300), ((row * this.tileSize) + 200), size, size);
    }
    drawRandomBox(ctx, column, row, size) {
        ctx.drawImage(this.randomBox, ((column * this.tileSize) + 300), ((row * this.tileSize) + 200), size, size);
    }
    drawStrongWall(ctx, column, row, size) {
        ctx.drawImage(this.strongWall, ((column * this.tileSize) + 300), ((row * this.tileSize) + 200), size, size);
    }
    getPlayer(velocity) {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                if (tile === 2) {
                    this.gameMap[this.activeMap].getGameMap()[row][column] = 0;
                    return new Player((column * this.tileSize), (row * this.tileSize), this.tileSize, velocity, this.gameMap[this.activeMap], this);
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
                    return new EnemyVirus((column * this.tileSize), (row * this.tileSize), this.tileSize, velocity, this);
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
            if (tile === 1 || tile === 42 || tile === 43) {
                return true;
            }
        }
        return false;
    }
    changeCookies(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 0) {
                this.gameMap[this.activeMap].setGameMap(row, column, 5);
                this.game.getUserData().addScore(1);
                return true;
            }
        }
        return false;
    }
    changePowerup(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 4) {
                this.gameMap[this.activeMap].setGameMap(row, column, 5);
                this.gameMap[this.activeMap].setGameMap(12, 18, 43);
                this.gameMap[this.activeMap].setGameMap(12, 21, 43);
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
    collideWithPassword(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 8) {
                console.log('collideWithPassword');
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=TileMaps.js.map