import AntiVirusTile from './AntiVirusTile.js';
import BlankTile from './BlankTile.js';
import CookiesDot from './CookiesDot.js';
import EnemyVirus from './EnemyVirus.js';
import FireWallTile from './FireWallTile.js';
import Game from './Game.js';
import LockTile from './LockTile.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';
import PortalTile from './PortalTile.js';
import RandomBoxTile from './RandomBoxTile.js';
import StrongWallTile from './StrongWallTile.js';
import VPNTile from './VPNTile.js';
import WallTile from './WallTile.js';
export default class TileMaps {
    tileSizeHeight;
    tileSizeWidth;
    tileSize;
    game;
    gameMap;
    activeMap;
    wallTile;
    blankTile;
    cookiesTile;
    portalTile;
    lockTile;
    randomBoxTile;
    strongWallTile;
    antiVirusTile;
    fireWallTile;
    vpnTile;
    tile;
    row;
    column;
    timer;
    heightRatio;
    widthRatio;
    powerUpChoice;
    constructor(game) {
        this.game = game;
        this.wallTile = new WallTile();
        this.blankTile = new BlankTile();
        this.cookiesTile = new CookiesDot();
        this.portalTile = new PortalTile();
        this.lockTile = new LockTile();
        this.antiVirusTile = new AntiVirusTile();
        this.fireWallTile = new FireWallTile();
        this.vpnTile = new VPNTile();
        this.randomBoxTile = new RandomBoxTile();
        this.strongWallTile = new StrongWallTile();
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        this.activeMap = 0;
        this.row = 0;
        this.column = 0;
        this.tile = 0;
        this.heightRatio = 300;
        this.widthRatio = 200;
        this.tileSizeHeight = 32;
        this.tileSizeWidth = 32;
        this.tileSize = 32;
    }
    loopRowColumn() {
        for (let rowTemp = 0; rowTemp < this.gameMap[this.activeMap].getGameMap().length; rowTemp++) {
            for (let columnTemp = 0; columnTemp < this.gameMap[this.activeMap].getGameMap()[rowTemp].length; columnTemp++) {
                this.row = rowTemp;
                this.column = columnTemp;
                this.tile = this.gameMap[this.activeMap].getGameMap()[this.row][this.column];
            }
        }
    }
    draw(ctx) {
        for (let rowTemp = 0; rowTemp < this.gameMap[this.activeMap].getGameMap().length; rowTemp++) {
            for (let columnTemp = 0; columnTemp < this.gameMap[this.activeMap].getGameMap()[rowTemp].length; columnTemp++) {
                this.row = rowTemp;
                this.column = columnTemp;
                this.tile = this.gameMap[this.activeMap].getGameMap()[this.row][this.column];
                if (this.tile === 0) {
                    this.cookiesTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 1) {
                    this.wallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 4) {
                    this.randomBoxTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 5) {
                    this.blankTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 6) {
                    this.fireWallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 7) {
                    this.antiVirusTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 8) {
                    this.lockTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 9) {
                    this.portalTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 10) {
                    this.vpnTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
                else if (this.tile === 43) {
                    this.strongWallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
                }
            }
        }
        this.game.writeTextToCanvas(`Password: ${this.game.getUserData().getDisplayedPassword()}`, this.game.canvas.width / 2, this.game.canvas.height * 0.2, 40);
    }
    getPlayer() {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                if (tile === 2) {
                    this.gameMap[this.activeMap].getGameMap()[row][column] = 0;
                    return new Player((column * this.tileSize), (row * this.tileSize), this.tileSize, this.gameMap[this.activeMap], this);
                }
            }
        }
        return null;
    }
    getEnemies() {
        for (let row = 0; row < this.gameMap[this.activeMap].getGameMap().length; row++) {
            for (let column = 0; column < this.gameMap[this.activeMap].getGameMap()[row].length; column++) {
                const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
                if (tile === 3) {
                    this.gameMap[this.activeMap].setGameMap(row, column, 0);
                    return new EnemyVirus((column * this.tileSize), (row * this.tileSize), this.tileSize, this);
                }
            }
        }
        return null;
    }
    collideWithEnvironment(x, y, direction) {
        if (Number.isInteger(x / this.tileSizeWidth)
            && Number.isInteger(y / this.tileSizeHeight)) {
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
        const column = x / this.tileSizeWidth;
        const row = y / this.tileSizeHeight;
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
                this.powerUpChoice = Game.randomNumber(0, 2);
                console.log(this.powerUpChoice);
                if (this.powerUpChoice === 0) {
                    this.setFireWall();
                    this.clearFireWall();
                }
                else if (this.powerUpChoice === 1) {
                    console.log('VPN');
                }
                else if (this.powerUpChoice === 2) {
                    console.log('AntiV');
                }
                return true;
            }
        }
        return false;
    }
    setFireWall() {
        setTimeout(() => {
            this.gameMap[this.activeMap].setGameMap(8, 18, 43);
            this.gameMap[this.activeMap].setGameMap(8, 21, 43);
        }, 500);
    }
    clearFireWall() {
        setTimeout(() => {
            this.gameMap[this.activeMap].setGameMap(8, 18, 5);
            this.gameMap[this.activeMap].setGameMap(8, 21, 5);
        }, 5000);
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