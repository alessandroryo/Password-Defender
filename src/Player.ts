import GameEntity from './GameEntity.js';
import KeyListener from './KeyboardListener.js';

export default class Player extends GameEntity {
  private xVelocity: number;

  private yVelocity: number;

  private maxX: number;

  private maxY: number;

  private keyboard: KeyListener;

  private poweredUp: boolean;

  private powerUpLeft: number;

  constructor(maxX: number, maxY: number) {
    super('./assets/img/Cookie.png', maxX - 76, maxY - 92);
    this.xVelocity = 5;
    this.yVelocity = 5;
    this.keyboard = new KeyListener();
  }

  public move(canvas: HTMLCanvasElement) : void {
    // Moving right
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_RIGHT)
      && this.xPos < canvas.width - this.img.width
    ) {
      this.xPos += this.xVelocity;
    }

    // Moving left
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_LEFT)
      && this.xPos > 0
    ) {
      this.xPos -= this.xVelocity;
    }

    // Moving up
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_UP)
      && this.yPos > 0
    ) {
      this.yPos -= this.yVelocity;
    }

    // Moving down
    if (
      this.keyboard.isKeyDown(KeyListener.KEY_DOWN)
      && this.yPos < canvas.height - this.img.height
    ) {
      this.yPos += this.yVelocity;
    }
  }
}
