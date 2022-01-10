import Game from './Game.js';
import GameMap from './GameMap.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
import TileMaps from './TileMaps.js';

export default class Player {
  private keyListener: KeyListener;

  private x: number;

  private y: number;

  private tileSize: number;

  private velocity: number;

  private gameMap: GameMap;

  private tileMap: TileMaps;

  private movingDirection: MovingDirection;

  private currentMovingDirection: number;

  private requestedMovingDirection: number;

  private eatCookiesSound: HTMLAudioElement;

  /**
   * Constructs a new player
   *
   * @param x X Cord
   * @param y Y Cord
   * @param tileSize the tile size of the mazeMap
   * @param velocity speed of the player
   * @param gameMap the map the player playes on
   * @param tileMap the tile map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    velocity: number,
    gameMap: GameMap,
    tileMap: TileMaps,
  ) {
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

  /**
   * Draws the player on the canvas
   *
   * @param ctx from Game and drawn on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.eatCookies();
    ctx.drawImage(
      Game.loadNewImage('./assets/img/linux_logo.png'),
      this.x,
      this.y,
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Method that handles all the players KeyInputs in the game itself
   * Other Screens might use diffrent keyHandlers
   */
  public handleKeyInput(): void {
    // Moving up - W
    if (this.keyListener.isKeyDown(KeyListener.KEY_W)) {
      if (this.currentMovingDirection === this.movingDirection.getMDDown()) {
        this.currentMovingDirection = this.movingDirection.getMDUp();
      }
      this.requestedMovingDirection = this.movingDirection.getMDUp();
    }
    // Moving down - S
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      if (this.currentMovingDirection === this.movingDirection.getMDUp()) {
        this.currentMovingDirection = this.movingDirection.getMDDown();
      }
      this.requestedMovingDirection = this.movingDirection.getMDDown();
    }
    // Moving left - A
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      if (this.currentMovingDirection === this.movingDirection.getMDRight()) {
        this.currentMovingDirection = this.movingDirection.getMDLeft();
      }
      this.requestedMovingDirection = this.movingDirection.getMDLeft();
    }
    // Moving right - D
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      if (this.currentMovingDirection === this.movingDirection.getMDLeft()) {
        this.currentMovingDirection = this.movingDirection.getMDRight();
      }
      this.requestedMovingDirection = this.movingDirection.getMDRight();
    }
  }

  /**
   * Method to move the player around. Keys are passed by the handleKeyInput method.
   * Using the movingDirection Object above the class, the direction is determined in the switch
   */
  public move(): void {
    // Comparing current and requested position
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize)
        && Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.collideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection,
          )) {
          this.currentMovingDirection = this.requestedMovingDirection;
        }
      }
    }

    if (this.tileMap.collideWithEnvironment(
      this.x,
      this.y,
      this.currentMovingDirection,
    )) {
      return;
    }

    // Switch for the other directions requested
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

  private eatCookies() : void {
    if (this.tileMap.eatCookies(this.x, this.y)) {
      this.eatCookiesSound.play();
    }
  }
}
