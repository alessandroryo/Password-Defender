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

  /**
   * Constructs a new player
   *
   * @param x X Cord
   * @param y Y Cord
   * @param tileSize the tile size of the mazeMap
   * @param velocity speed of the player
   * @param tileMap the map the player playes on
   */
  constructor(x: number, y: number, tileSize: number, velocity: number, tileMap: GameMap) {
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

  /**
   * Draws the player on the canvas
   * @param ctx from Game and drawn on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    // this.move();
    ctx.drawImage(Game.loadNewImage('./assets/img/linux_logo.png'), this.x, this.y, this.tileSize, this.tileSize);
  }

  /**
   * Method that handles all the players KeyInputs in the game itself
   * Other Screens might use diffrent keyHandlers
   */
  public handleKeyInput(): void {
    // moving up - W
    if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
      if (this.currentMovingDirection === movingDirection.down) {
        this.currentMovingDirection = movingDirection.up;
      }
      this.requestedMovingDirection = movingDirection.up;
    }
    // moving down - S
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      console.log('down pressed');
      if (this.currentMovingDirection === movingDirection.up) {
        this.currentMovingDirection = movingDirection.down;
        console.log(this.currentMovingDirection);
      }
      this.requestedMovingDirection = movingDirection.down;
      console.log(this.requestedMovingDirection);
    }
    // moving left - A
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      if (this.currentMovingDirection === movingDirection.right) {
        this.currentMovingDirection = movingDirection.left;
      }
      this.requestedMovingDirection = movingDirection.left;
    }
    // moving right - D
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      if (this.currentMovingDirection === movingDirection.left) {
        this.currentMovingDirection = movingDirection.right;
      }
      this.requestedMovingDirection = movingDirection.right;
    }
  }

  /**
   * Method to move the player around. Keys are passed by the handleKeyInput method.
   * Using the movingDirection Object above the class, the direction is determined in the switch
   */
  public move(): void {
    // Comparing current and requested position
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      console.log('first if');
      if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
        console.log(this.currentMovingDirection);
        this.currentMovingDirection = this.requestedMovingDirection;
        console.log(this.currentMovingDirection);
      }
    }
    // Switch for the other directions requested
    switch (this.currentMovingDirection) {
      case movingDirection.up:
        this.y -= this.velocity;
        break;
      case movingDirection.down:
        console.log(this.y);
        this.y += this.velocity;
        break;
      case movingDirection.left:
        this.x -= this.velocity;
        break;
      case movingDirection.right:
        this.x += this.velocity;
        break;
      default:
        console.log('player not hitting any key');
        break;
    }
  }
}
