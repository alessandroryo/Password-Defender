import Game from './Game.js';
import GameMap from './GameMap.js';
import KeyListener from './KeyboardListener.js';

const movingDirection = {
  up: 0,
  down: 1,
  left: 2,
  right: 3,
};

export default class Player {
  private keyListener: KeyListener;

  private x: number;

  private y: number;

  private tileSize: number;

  private velocity: number;

  private tileMap: GameMap;

  private currentMovingDirection: number;

  private requestedMovingDirection: number;

  constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: GameMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.keyListener = new KeyListener();

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(Game.loadNewImage('./assets/img/linux_logo.png'), this.x, this.y, this.tileSize, this.tileSize);
  }

  private handleKeyInput(): void {
    // moving up - W
    if (this.keyListener.isKeyDown(87)) {
      if (this.currentMovingDirection === movingDirection.down) {
        this.currentMovingDirection = movingDirection.up;
      }
      this.requestedMovingDirection = movingDirection.up;
    }
    // moving down - S
    if (this.keyListener.isKeyDown(83)) {
      if (this.currentMovingDirection === movingDirection.up) {
        this.currentMovingDirection = movingDirection.down;
      }
      this.requestedMovingDirection = movingDirection.down;
    }
    // moving left - A
    if (this.keyListener.isKeyDown(65)) {
      if (this.currentMovingDirection === movingDirection.right) {
        this.currentMovingDirection = movingDirection.left;
      }
      this.requestedMovingDirection = movingDirection.left;
    }
    // moving right - D
    if (this.keyListener.isKeyDown(68)) {
      if (this.currentMovingDirection === movingDirection.left) {
        this.currentMovingDirection = movingDirection.right;
      }
      this.requestedMovingDirection = movingDirection.right;
    }
  }

  public move(): void {
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
