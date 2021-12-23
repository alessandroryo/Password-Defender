import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
const movingDirection = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
};
export default class Player {
    keyListener;
    x;
    y;
    tileSize;
    velocity;
    tileMap;
    currentMovingDirection;
    requestedMovingDirection;
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.keyListener = new KeyListener();
        this.currentMovingDirection = null;
        this.requestedMovingDirection = null;
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage('./assets/img/linux_logo.png'), this.x, this.y, this.tileSize, this.tileSize);
    }
    handleKeyInput() {
        if (this.keyListener.isKeyDown(87)) {
            if (this.currentMovingDirection === movingDirection.down) {
                this.currentMovingDirection = movingDirection.up;
            }
            this.requestedMovingDirection = movingDirection.up;
        }
        if (this.keyListener.isKeyDown(83)) {
            if (this.currentMovingDirection === movingDirection.up) {
                this.currentMovingDirection = movingDirection.down;
            }
            this.requestedMovingDirection = movingDirection.down;
        }
        if (this.keyListener.isKeyDown(65)) {
            if (this.currentMovingDirection === movingDirection.right) {
                this.currentMovingDirection = movingDirection.left;
            }
            this.requestedMovingDirection = movingDirection.left;
        }
        if (this.keyListener.isKeyDown(68)) {
            if (this.currentMovingDirection === movingDirection.left) {
                this.currentMovingDirection = movingDirection.right;
            }
            this.requestedMovingDirection = movingDirection.right;
        }
    }
    move() {
        if (this.currentMovingDirection === this.requestedMovingDirection) {
            if (this.x / this.tileSize && this.y / this.tileSize) {
                this.currentMovingDirection = this.requestedMovingDirection;
            }
        }
        switch (this.currentMovingDirection) {
            case movingDirection.up:
                this.y -= this.velocity;
                break;
            case movingDirection.down:
                this.y -= this.velocity;
                break;
            case movingDirection.left:
                this.x -= this.velocity;
                break;
            case movingDirection.right:
                this.x -= this.velocity;
                break;
            default:
                console.log('player switch error');
                break;
        }
    }
}
//# sourceMappingURL=Player.js.map