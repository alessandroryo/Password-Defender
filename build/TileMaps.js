import BlankTile from './BlankTile.js';
import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import LockTile from './LockTile.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import PowerUps from './PowerUps.js';
import Player from './Player.js';
import PortalTile from './PortalTile.js';
import RandomBoxTile from './RandomBoxTile.js';
import StrongWallTile from './StrongWallTile.js';
import WallTile from './WallTile.js';
import CookiesTile from './CookiesTile.js';
import SpawnTile from './SpawnTile.js';
export default class TileMaps {
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
    spawnTile;
    tile;
    row;
    column;
    timer;
    powerUpChoice;
    powerUp;
    enemyCount;
    level;
    player;
    powerUpActive;
    static powerUpOneActive;
    static powerUpTwoActive;
    static powerUpThreeActive;
    constructor(game) {
        this.game = game;
        this.wallTile = new WallTile();
        this.blankTile = new BlankTile();
        this.cookiesTile = new CookiesTile();
        this.portalTile = new PortalTile();
        this.lockTile = new LockTile();
        this.randomBoxTile = new RandomBoxTile();
        this.strongWallTile = new StrongWallTile();
        this.spawnTile = new SpawnTile();
        this.gameMap = [];
        this.gameMap[0] = new MapOne();
        this.gameMap[1] = new MapTwo();
        this.activeMap = 0;
        this.row = 0;
        this.column = 0;
        this.tile = 0;
        this.tileSize = 32;
        this.powerUp = new PowerUps();
        this.powerUpActive = false;
        this.enemyCount = this.gameMap[this.activeMap].getEnemyCount();
    }
    nextLevel() {
        if (this.game.getUserData().getScore() === 15
            && this.gameMap[0].getGameMap()) {
            this.activeMap = 1;
            console.log(this.activeMap);
        }
    }
    getEnemyCount() {
        return this.enemyCount;
    }
    draw(ctx) {
        for (let rowTemp = 0; rowTemp < this.gameMap[this.activeMap].getGameMap().length; rowTemp++) {
            for (let columnTemp = 0; columnTemp < this.gameMap[this.activeMap].getGameMap()[rowTemp].length; columnTemp++) {
                this.row = rowTemp;
                this.column = columnTemp;
                this.tile = this.gameMap[this.activeMap].getGameMap()[this.row][this.column];
                if (this.tile === 0) {
                    this.cookiesTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 1) {
                    this.wallTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 4) {
                    this.powerUp.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 5) {
                    this.blankTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 8) {
                    this.lockTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 9) {
                    this.portalTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 10) {
                    this.spawnTile.draw(ctx, this.column, this.row);
                }
                else if (this.tile === 43) {
                    this.strongWallTile.draw(ctx, this.column, this.row);
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
                    return new Player((column * this.tileSize), (row * this.tileSize), this.tileSize, this, this.gameMap[this.activeMap]);
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
                    return new EnemyVirus((column * this.tileSize), (row * this.tileSize), this.tileSize, this, this.gameMap[this.activeMap]);
                }
            }
        }
        return null;
    }
    spawnEnemy() {
        return new EnemyVirus((2 * this.tileSize), (19 * this.tileSize), this.tileSize, this, this.gameMap[this.activeMap]);
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
    randomPowerUp(x, y) {
        const column = x / this.tileSize;
        const row = y / this.tileSize;
        if (Number.isInteger(row)
            && Number.isInteger(column)) {
            if (this.gameMap[this.activeMap].getGameMap()[row][column] === 4) {
                this.gameMap[this.activeMap].setGameMap(row, column, 5);
                if (this.powerUpActive === false) {
                    this.powerUpChoice = Game.randomNumber(1, 1);
                    this.setPowerUp();
                }
                return true;
            }
        }
        return false;
    }
    setPowerUp() {
        if (this.powerUpChoice === 1) {
            this.powerUp.setFireWall(this.gameMap[this.activeMap]);
            this.powerUp.clearFireWall(this.gameMap[this.activeMap]);
            TileMaps.powerUpOneActive = true;
            this.resetPowerUp();
        }
        if (this.powerUpChoice === 2) {
            this.resetPowerUp();
            TileMaps.powerUpTwoActive = true;
        }
        if (this.powerUpChoice === 3) {
            this.resetPowerUp();
            TileMaps.powerUpThreeActive = true;
        }
    }
    resetPowerUp() {
        setTimeout(() => {
            this.powerUpChoice = 0;
        }, 0);
    }
    getPowerUpChoice() {
        return this.powerUpChoice;
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
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=TileMaps.js.map