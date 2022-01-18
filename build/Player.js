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
    getVPNActive() {
        return this.vpnActive;
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
    getAVActive() {
        return this.avActive;
    }
}
//# sourceMappingURL=Player.js.map