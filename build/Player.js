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
        console.log(this);
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage('./assets/img/linux_logo.png'), this.x, this.y, this.tileSize, this.tileSize);
    }
    handleKeyInput() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
            if (this.currentMovingDirection === movingDirection.down) {
                this.currentMovingDirection = movingDirection.up;
            }
            this.requestedMovingDirection = movingDirection.up;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            console.log('down pressed');
            if (this.currentMovingDirection === movingDirection.up) {
                this.currentMovingDirection = movingDirection.down;
                console.log(this.currentMovingDirection);
            }
            this.requestedMovingDirection = movingDirection.down;
            console.log(this.requestedMovingDirection);
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
            if (this.currentMovingDirection === movingDirection.right) {
                this.currentMovingDirection = movingDirection.left;
            }
            this.requestedMovingDirection = movingDirection.left;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
            if (this.currentMovingDirection === movingDirection.left) {
                this.currentMovingDirection = movingDirection.right;
            }
            this.requestedMovingDirection = movingDirection.right;
        }
    }
    move() {
        if (this.currentMovingDirection !== this.requestedMovingDirection) {
            console.log('first if');
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                console.log(this.currentMovingDirection);
                this.currentMovingDirection = this.requestedMovingDirection;
                console.log(this.currentMovingDirection);
            }
        }
        switch (this.currentMovingDirection) {
            case movingDirection.up:
                this.y -= this.velocity;
                console.log(this.velocity);
                break;
            case movingDirection.down:
                console.log(this.y);
                this.y += this.velocity;
                console.log(this.velocity);
                break;
            case movingDirection.left:
                this.x -= this.velocity;
                console.log(this.velocity);
                break;
            case movingDirection.right:
                this.x += this.velocity;
                console.log(this.velocity);
                break;
            default:
                console.log('player not hitting any key');
                break;
        }
    }
}
//# sourceMappingURL=Player.js.map