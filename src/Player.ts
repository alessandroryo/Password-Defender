import EnemyVirus from './EnemyVirus.js';
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

    this.eatCookiesSound = new Audio('./assets/sound/eatcookies.wav');
  }

  /**
   * Draws the player on the canvas
   *
   * @param ctx from Game and drawn on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.eatCookies();
    this.teleportPlayer();
    ctx.drawImage(
      Game.loadNewImage('./assets/img/linux_logo.png'),
      this.x + 300,
      this.y + 200,
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
      if (this.currentMovingDirection === MovingDirection.getMDDown()) {
        this.currentMovingDirection = MovingDirection.getMDUp();
      }
      this.requestedMovingDirection = MovingDirection.getMDUp();
    }
    // Moving down - S
    if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
      if (this.currentMovingDirection === MovingDirection.getMDUp()) {
        this.currentMovingDirection = MovingDirection.getMDDown();
      }
      this.requestedMovingDirection = MovingDirection.getMDDown();
    }
    // Moving left - A
    if (this.keyListener.isKeyDown(KeyListener.KEY_A)) {
      if (this.currentMovingDirection === MovingDirection.getMDRight()) {
        this.currentMovingDirection = MovingDirection.getMDLeft();
      }
      this.requestedMovingDirection = MovingDirection.getMDLeft();
    }
    // Moving right - D
    if (this.keyListener.isKeyDown(KeyListener.KEY_D)) {
      if (this.currentMovingDirection === MovingDirection.getMDLeft()) {
        this.currentMovingDirection = MovingDirection.getMDRight();
      }
      this.requestedMovingDirection = MovingDirection.getMDRight();
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

  /**
   * Checks the moving direction
   */
  public teleportPlayer(): void {
    if (this.tileMap.teleportPlayer(this.x, this.y) !== null) {
      // console.log('tp');
      if (
        this.currentMovingDirection === MovingDirection.getMDLeft()
        && this.x <= 33
      ) {
        this.x += (this.tileMap.teleportPlayer(this.x, this.y) * 32);
        this.x -= 98;
      } else if (
        this.currentMovingDirection === MovingDirection.getMDRight()
        && this.x >= 64
      ) {
        this.x -= (this.tileMap.teleportPlayer(this.x, this.y) * 32);
        this.x += 98;
      }
    }
  }

  /**
   *
   * @param enemyVirus Array of threats
   * @returns Check collide with threats
   */
  public collideWithEnemy(enemyVirus: EnemyVirus[]) : EnemyVirus {
    let collides: EnemyVirus = null;
    const size = this.tileSize / 2;
    enemyVirus.forEach((enemy) => {
      if (
        this.x < enemy.getXPos() + size
        && this.x + size > enemy.getXPos()
        && this.y < enemy.getYPos() + size
        && this.y + size > enemy.getYPos()
      ) {
        console.log('collides with enemy');
        collides = enemy;
      }
    });
    return collides;
  }

  private eatCookies() : void {
    if (this.tileMap.changeCookies(this.x, this.y)) {
      this.eatCookiesSound.play();
    }
  }

  public checkForDamage(): boolean {
    if (this.tileMap.collideWithPassword(this.x, this.y)) {
      return true;
    }
    return false;
  }
}
