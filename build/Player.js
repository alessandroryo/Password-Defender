import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
export default class Player {
    keyListener;
    x;
    y;
    tileSize;
    velocity;
    gameMap;
    tileMap;
    movingDirection;
    currentMovingDirection;
    requestedMovingDirection;
    eatCookiesSound;
    constructor(x, y, tileSize, velocity, gameMap, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.gameMap = gameMap;
        this.tileMap = tileMap;
        this.keyListener = new KeyListener();
        this.movingDirection = new MovingDirection();
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        this.eatCookiesSound = new Audio('./assets/sound/sounds_waka.wav');
    }
    draw(ctx) {
        this.eatCookies();
        ctx.drawImage(Game.loadNewImage('./assets/img/linux_logo.png'), this.x, this.y, this.tileSize, this.tileSize);
    }
    handleKeyInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
            if (this.currentMovingDirection === this.movingDirection.getMDDown()) {
                this.currentMovingDirection = this.movingDirection.getMDUp();
            }
            this.requestedMovingDirection = this.movingDirection.getMDUp();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            if (this.currentMovingDirection === this.movingDirection.getMDUp()) {
                this.currentMovingDirection = this.movingDirection.getMDDown();
            }
            this.requestedMovingDirection = this.movingDirection.getMDDown();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            if (this.currentMovingDirection === this.movingDirection.getMDRight()) {
                this.currentMovingDirection = this.movingDirection.getMDLeft();
            }
            this.requestedMovingDirection = this.movingDirection.getMDLeft();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
            if (this.currentMovingDirection === this.movingDirection.getMDLeft()) {
                this.currentMovingDirection = this.movingDirection.getMDRight();
            }
            this.requestedMovingDirection = this.movingDirection.getMDRight();
        }
    }
    move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            if (Number.isInteger(this.x / this.tileSize)
                && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.collideWithEnvironment(this.x, this.y, this.requestedMovingDirection)) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }
        }
        if (this.tileMap.collideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
            return;
        }
        switch (this.currentMovingDirection) {
            case this.movingDirection.getMDUp():
                this.y -= this.velocity;
                break;
            case this.movingDirection.getMDDown():
                this.y += this.velocity;
                break;
            case this.movingDirection.getMDLeft():
                this.x -= this.velocity;
                break;
            case this.movingDirection.getMDRight():
                this.x += this.velocity;
                break;
            default:
                break;
        }
    }
    eatCookies() {
        if (this.tileMap.eatCookies(this.x, this.y)) {
            this.eatCookiesSound.play();
        }
    }
}
//# sourceMappingURL=Player.js.map