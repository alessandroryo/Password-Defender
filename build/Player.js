import Game from './Game.js';
import GameEntity from './GameEntity.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
import PowerupPopup from './PowerupPopup.js';
export default class Player extends GameEntity {
    keyListener;
    movingDirection;
    currentMovingDirection;
    requestedMovingDirection;
    eatCookiesSound;
    playerNormal;
    playerMask;
    playerAV;
    playerImages;
    playerImagesIndex;
    vpnActive;
    vpnExpire;
    vpnTimers;
    avActive;
    avExpire;
    avTimers;
    constructor(column, row, tileSize, tileMaps, gameMap) {
        super(column, row, tileSize, tileMaps, gameMap);
        this.velocity = 2;
        this.keyListener = new KeyListener();
        this.movingDirection = new MovingDirection();
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        this.eatCookiesSound = new Audio('./assets/sound/eatcookies.wav');
        this.playerImages = [];
        this.playerImagesIndex = 0;
        this.loadPlayerImages();
        this.vpnActive = false;
        this.vpnExpire = false;
        this.vpnTimers = [];
        this.avActive = false;
        this.avExpire = false;
        this.avTimers = [];
    }
    setPlayerIndex(type) {
        this.playerImagesIndex = type;
    }
    loadPlayerImages() {
        this.playerNormal = localStorage.getItem('playerSkinSrc');
        this.playerMask = './assets/img/Linux-Logo-(Transparent).png';
        this.playerAV = './assets/img/Linux-Logo-(Antivirus).png';
        this.playerImages = [
            this.playerNormal,
            this.playerMask,
            this.playerAV,
        ];
    }
    teleportPlayer() {
        if (this.tileMaps.teleportPlayer(this.column, this.row) !== null) {
            if (this.currentMovingDirection === MovingDirection.getMDLeft()
                && this.column <= 33) {
                this.column += (this.tileMaps.teleportPlayer(this.column, this.row) * 32);
                this.column -= 98;
            }
            else if (this.currentMovingDirection === MovingDirection.getMDRight()
                && this.column >= 64) {
                this.column -= (this.tileMaps.teleportPlayer(this.column, this.row) * 32);
                this.column += 98;
            }
        }
    }
    eatCookies() {
        if (this.tileMaps.changeCookies(this.column, this.row)) {
            this.eatCookiesSound.play();
        }
    }
    eatPower() {
        if (this.tileMaps.randomPowerUp(this.column, this.row)) {
            this.eatCookiesSound.play();
        }
    }
    useVPN() {
        if (this.tileMaps.getPowerUpChoice() === 2) {
            this.setPlayerIndex(1);
            setTimeout(() => {
                this.setPlayerIndex(0);
            }, 1000 * 6);
            this.vpnActive = true;
            this.vpnExpire = false;
            this.vpnTimers.forEach((timer) => clearTimeout(timer));
            this.vpnTimers = [];
            const vpnTimer = setTimeout(() => {
                this.vpnActive = false;
                this.vpnExpire = false;
            }, 1000 * 6);
            this.vpnTimers.push(vpnTimer);
            const vpnExpireTimer = setTimeout(() => {
                this.vpnExpire = true;
            }, 0);
            this.vpnTimers.push(vpnExpireTimer);
        }
    }
    useAntivirus() {
        if (this.tileMaps.getPowerUpChoice() === 3) {
            this.setPlayerIndex(2);
            setTimeout(() => {
                this.setPlayerIndex(0);
            }, 1000 * 6);
            this.avActive = true;
            this.avExpire = false;
            this.avTimers.forEach((timer) => clearTimeout(timer));
            this.avTimers = [];
            const avTimer = setTimeout(() => {
                this.avActive = false;
                this.avExpire = false;
            }, 1000 * 6);
            this.avTimers.push(avTimer);
            const avExpireTimer = setTimeout(() => {
                this.avExpire = true;
            }, 0);
            this.avTimers.push(avExpireTimer);
        }
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage(this.playerImages[this.playerImagesIndex]), this.column + (window.innerWidth / 6), this.row + (window.innerHeight / 5), this.tileSize, this.tileSize);
    }
    update() {
        this.eatCookies();
        this.eatPower();
        this.useVPN();
        this.useAntivirus();
        this.teleportPlayer();
    }
    handleKeyInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
            if (this.currentMovingDirection === MovingDirection.getMDDown()) {
                this.currentMovingDirection = MovingDirection.getMDUp();
            }
            this.requestedMovingDirection = MovingDirection.getMDUp();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            if (this.currentMovingDirection === MovingDirection.getMDUp()) {
                this.currentMovingDirection = MovingDirection.getMDDown();
            }
            this.requestedMovingDirection = MovingDirection.getMDDown();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            if (this.currentMovingDirection === MovingDirection.getMDRight()) {
                this.currentMovingDirection = MovingDirection.getMDLeft();
            }
            this.requestedMovingDirection = MovingDirection.getMDLeft();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
            if (this.currentMovingDirection === MovingDirection.getMDLeft()) {
                this.currentMovingDirection = MovingDirection.getMDRight();
            }
            this.requestedMovingDirection = MovingDirection.getMDRight();
        }
    }
    move() {
        if (PowerupPopup.allowedToMove === true) {
            if (this.currentMovingDirection !== this.requestedMovingDirection) {
                if (Number.isInteger(this.column / this.tileSize)
                    && Number.isInteger(this.row / this.tileSize)) {
                    if (!this.tileMaps.collideWithEnvironment(this.column, this.row, this.requestedMovingDirection)) {
                        this.currentMovingDirection = this.requestedMovingDirection;
                    }
                }
            }
            if (this.tileMaps.collideWithEnvironment(this.column, this.row, this.currentMovingDirection)) {
                return;
            }
            switch (this.currentMovingDirection) {
                case MovingDirection.getMDUp():
                    this.row -= this.velocity;
                    break;
                case MovingDirection.getMDDown():
                    this.row += this.velocity;
                    break;
                case MovingDirection.getMDLeft():
                    this.column -= this.velocity;
                    break;
                case MovingDirection.getMDRight():
                    this.column += this.velocity;
                    break;
                default:
                    break;
            }
        }
    }
    collideWithEnemy(enemyVirus) {
        let collides = null;
        const size = this.tileSize / 2;
        enemyVirus.forEach((enemy) => {
            if ((this.column < enemy.getXPos() + size
                && this.column + size > enemy.getXPos()
                && this.row < enemy.getYPos() + size
                && this.row + size > enemy.getYPos())) {
                collides = enemy;
            }
        });
        return collides;
    }
    eatVirus(enemyVirus) {
        if (this.avActive) {
            const collideEnemies = enemyVirus.filter((enemy) => enemy.collideWith(this));
            collideEnemies.forEach((enemy) => {
                enemyVirus.splice(enemyVirus.indexOf(enemy), 1);
            });
        }
    }
    getVPNActive() {
        return this.vpnActive;
    }
    getAVActive() {
        return this.avActive;
    }
    getXPos() {
        return this.column;
    }
    getYPos() {
        return this.row;
    }
}
//# sourceMappingURL=Player.js.map