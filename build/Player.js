import GameEntity from './GameEntity.js';
import KeyListener from './KeyboardListener.js';
export default class Player extends GameEntity {
    xVelocity;
    yVelocity;
    maxX;
    maxY;
    keyboard;
    poweredUp;
    powerUpLeft;
    constructor(maxX, maxY) {
        super('./assets/img/Cookie.png', maxX - 76, maxY - 92);
        this.xVelocity = 5;
        this.yVelocity = 5;
        this.keyboard = new KeyListener();
    }
    move(canvas) {
        if (this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
            && this.xPos < canvas.width - this.img.width) {
            this.xPos += this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
            && this.xPos > 0) {
            this.xPos -= this.xVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_UP)
            && this.yPos > 0) {
            this.yPos -= this.yVelocity;
        }
        if (this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
            && this.yPos < canvas.height - this.img.height) {
            this.yPos += this.yVelocity;
        }
    }
}
//# sourceMappingURL=Player.js.map