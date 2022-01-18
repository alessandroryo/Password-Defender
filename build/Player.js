import Game from './Game.js';
import GameEntity from './GameEntity.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
export default class Player extends GameEntity {
    keyListener;
    movingDirection;
    currentMovingDirection;
    requestedMovingDirection;
    eatCookiesSound;
    playerIconSrc;
    playerNormal;
    playerMask;
    playerAV;
    playerImages;
    playerImagesIndex;
    antivirusActive;
    antivirusExpire;
    timers;
    constructor(x, y, tileSize, tileMaps, gameMap) {
        super(x, y, tileSize, tileMaps, gameMap);
        this.velocity = 2;
        this.keyListener = new KeyListener();
        this.movingDirection = new MovingDirection();
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        this.eatCookiesSound = new Audio('./assets/sound/eatcookies.wav');
        this.playerImages = [];
        this.playerImagesIndex = 0;
        this.loadPlayerImages();
        this.antivirusActive = false;
        this.antivirusExpire = false;
        this.timers = [];
    }
    setPlayerIndex(type) {
        this.playerImagesIndex = type;
    }
    loadPlayerImages() {
        this.playerNormal = './assets/img/Linux-Logo.png';
        this.playerMask = './assets/img/Linux-Logo-(Transparent).png';
        this.playerAV = './assets/img/Linux-Logo-(Antivirus).png';
        this.playerImages = [
            this.playerNormal,
            this.playerMask,
            this.playerAV,
        ];
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage(this.playerImages[this.playerImagesIndex]), this.x + 300, this.y + 200, this.tileSize, this.tileSize);
    }
    update() {
        this.eatCookies();
        this.eatPower();
        this.getVPN();
        this.getAntivirus();
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
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            if (Number.isInteger(this.x / this.tileSize)
                && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMaps.collideWithEnvironment(this.x, this.y, this.requestedMovingDirection)) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }
        }
        if (this.tileMaps.collideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
            return;
        }
        switch (this.currentMovingDirection) {
            case MovingDirection.getMDUp():
                this.y -= this.velocity;
                break;
            case MovingDirection.getMDDown():
                this.y += this.velocity;
                break;
            case MovingDirection.getMDLeft():
                this.x -= this.velocity;
                break;
            case MovingDirection.getMDRight():
                this.x += this.velocity;
                break;
            default:
                break;
        }
    }
    teleportPlayer() {
        if (this.tileMaps.teleportPlayer(this.x, this.y) !== null) {
            if (this.currentMovingDirection === MovingDirection.getMDLeft()
                && this.x <= 33) {
                this.x += (this.tileMaps.teleportPlayer(this.x, this.y) * 32);
                this.x -= 98;
            }
            else if (this.currentMovingDirection === MovingDirection.getMDRight()
                && this.x >= 64) {
                this.x -= (this.tileMaps.teleportPlayer(this.x, this.y) * 32);
                this.x += 98;
            }
        }
    }
    collideWithEnemy(enemyVirus) {
        let collides = null;
        const size = this.tileSize / 2;
        enemyVirus.forEach((enemy) => {
            if ((this.x < enemy.getXPos() + size
                && this.x + size > enemy.getXPos()
                && this.y < enemy.getYPos() + size
                && this.y + size > enemy.getYPos())) {
                collides = enemy;
            }
        });
        return collides;
    }
    eatCookies() {
        if (this.tileMaps.changeCookies(this.x, this.y)) {
            this.eatCookiesSound.play();
        }
    }
    eatPower() {
        if (this.tileMaps.randomPowerUp(this.x, this.y)) {
            this.eatCookiesSound.play();
        }
    }
    getAntivirus() {
        if (this.tileMaps.getPowerUpChoice() === 3) {
            this.setPlayerIndex(2);
            setTimeout(() => {
                this.setPlayerIndex(0);
            }, 3000);
            this.antivirusActive = true;
            this.antivirusExpire = false;
            this.timers.forEach((timer) => clearTimeout(timer));
            this.timers = [];
            const powerDotTimer = setTimeout(() => {
                this.antivirusActive = false;
                this.antivirusExpire = false;
            }, 1000 * 6);
            this.timers.push(powerDotTimer);
            const powerDotAboutToExpireTimer = setTimeout(() => {
                this.antivirusExpire = true;
            }, 1000 * 3);
            this.timers.push(powerDotAboutToExpireTimer);
        }
    }
    getVPN() {
        if (this.tileMaps.getPowerUpChoice() === 2) {
            this.setPlayerIndex(1);
            setTimeout(() => {
                this.setPlayerIndex(0);
            }, 3000);
        }
    }
}
//# sourceMappingURL=Player.js.map