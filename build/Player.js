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
    playerIconSrc;
    constructor(x, y, tileSize, gameMap, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.gameMap = gameMap;
        this.tileMap = tileMap;
        this.velocity = 2;
        this.keyListener = new KeyListener();
        this.movingDirection = new MovingDirection();
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
        this.eatCookiesSound = new Audio('./assets/sound/eatcookies.wav');
        this.playerIconSrc = './assets/img/Linux-Logo-(Transparent).png';
    }
    draw(ctx) {
        this.eatCookies();
        this.eatPower();
        this.teleportPlayer();
        ctx.drawImage(Game.loadNewImage(this.playerIconSrc), this.x + 300, this.y + 200, this.tileSize, this.tileSize);
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
                if (!this.tileMap.collideWithEnvironment(this.x, this.y, this.requestedMovingDirection)) {
                    this.currentMovingDirection = this.requestedMovingDirection;
                }
            }
        }
        if (this.tileMap.collideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
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
        if (this.tileMap.teleportPlayer(this.x, this.y) !== null) {
            if (this.currentMovingDirection === MovingDirection.getMDLeft()
                && this.x <= 33) {
                this.x += (this.tileMap.teleportPlayer(this.x, this.y) * 32);
                this.x -= 98;
            }
            else if (this.currentMovingDirection === MovingDirection.getMDRight()
                && this.x >= 64) {
                this.x -= (this.tileMap.teleportPlayer(this.x, this.y) * 32);
                this.x += 98;
            }
        }
    }
    collideWithEnemy(enemyVirus) {
        let collides = null;
        const size = this.tileSize / 2;
        enemyVirus.forEach((enemy) => {
            if (this.x < enemy.getXPos() + size
                && this.x + size > enemy.getXPos()
                && this.y < enemy.getYPos() + size
                && this.y + size > enemy.getYPos()) {
                collides = enemy;
            }
        });
        return collides;
    }
    collideWithPowerUp(powerUp) {
        const size = this.tileSize / 2;
        if (this.x < powerUp.getXPos() + size
            && this.x + size > powerUp.getXPos()
            && this.y < powerUp.getYPos() + size
            && this.y + size > powerUp.getYPos()) {
            return true;
        }
        return false;
    }
    eatCookies() {
        if (this.tileMap.changeCookies(this.x, this.y)) {
            this.eatCookiesSound.play();
        }
    }
    eatPower() {
        if (this.tileMap.changePowerup(this.x, this.y)) {
            this.eatCookiesSound.play();
        }
    }
    setPlayerIcon(iconSrc) {
        this.playerIconSrc = iconSrc;
    }
}
//# sourceMappingURL=Player.js.map