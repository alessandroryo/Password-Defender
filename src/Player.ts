import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import GameEntity from './GameEntity.js';
import GameMap from './GameMap.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
import TileMaps from './TileMaps.js';

export default class Player extends GameEntity {
  private keyListener: KeyListener;

  private movingDirection: MovingDirection;

  private currentMovingDirection: number;

  private requestedMovingDirection: number;

  private eatCookiesSound: HTMLAudioElement;

  private playerIconSrc: string;

  private playerNormal: string;

  private playerMask: string;

  private playerAV: string;

  private playerImages: string[];

  private playerImagesIndex: number;

  private antivirusActive: boolean;

  private antivirusExpire: boolean;

  private timers: number[];

  /**
   * Constructor for enemy virus
   *
   * @param x Player x position
   * @param y Player y position
   * @param tileSize Player tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    super(
      x,
      y,
      tileSize,
      tileMaps,
      gameMap,
    );

    this.velocity = 2;

    this.keyListener = new KeyListener();

    this.movingDirection = new MovingDirection();
    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.eatCookiesSound = new Audio('./assets/sound/eatcookies.wav');

    this.playerImages = [];
    this.playerImagesIndex = 0;
    this.loadPlayerImages();

    this.antivirusActive = false;
    this.antivirusExpire = false;
    this.timers = [];
  }

  /**
   * @param type
   */
  private setPlayerIndex(type: number): void {
    this.playerImagesIndex = type;
  }

  private loadPlayerImages(): void {
    this.playerNormal = './assets/img/Linux-Logo.png';
    this.playerMask = './assets/img/Linux-Logo-(Transparent).png';
    this.playerAV = './assets/img/Linux-Logo-(Antivirus).png';

    this.playerImages = [
      this.playerNormal,
      this.playerMask,
      this.playerAV,
    ];
  }

  /**
   * Draws the player on the canvas
   *
   * @param ctx from Game and drawn on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      Game.loadNewImage(this.playerImages[this.playerImagesIndex]),
      this.x + 300,
      this.y + 200,
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Updating player method
   */
  public update() : void {
    this.eatCookies();
    this.eatPower();
    this.getVPN();
    this.getAntivirus();
    this.teleportPlayer();
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
          !this.tileMaps.collideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection,
          )) {
          this.currentMovingDirection = this.requestedMovingDirection;
        }
      }
    }

    if (this.tileMaps.collideWithEnvironment(
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
  private teleportPlayer(): void {
    if (this.tileMaps.teleportPlayer(this.x, this.y) !== null) {
      // console.log('tp');
      if (
        this.currentMovingDirection === MovingDirection.getMDLeft()
        && this.x <= 33
      ) {
        this.x += (this.tileMaps.teleportPlayer(this.x, this.y) * 32);
        this.x -= 98;
      } else if (
        this.currentMovingDirection === MovingDirection.getMDRight()
        && this.x >= 64
      ) {
        this.x -= (this.tileMaps.teleportPlayer(this.x, this.y) * 32);
        this.x += 98;
      }
    }
  }

  /**
   *
   * @param enemyVirus Array of threats
   * @returns Check collide with threats
   */
  public collideWithEnemy(enemyVirus: EnemyVirus[]): EnemyVirus {
    let collides: EnemyVirus = null;
    const size = this.tileSize / 2;
    enemyVirus.forEach((enemy) => {
      if (
        (this.x < enemy.getXPos() + size
          && this.x + size > enemy.getXPos()
          && this.y < enemy.getYPos() + size
          && this.y + size > enemy.getYPos())
        // || this.antivirusActive === false
      ) {
        collides = enemy;
      }
    });
    return collides;
  }

  private eatCookies(): void {
    if (this.tileMaps.changeCookies(this.x, this.y)) {
      this.eatCookiesSound.play();
    }
  }

  private eatPower(): void {
    if (this.tileMaps.randomPowerUp(this.x, this.y)) {
      this.eatCookiesSound.play();
    }
  }

  private getAntivirus(): void {
    if (this.tileMaps.getPowerUpChoice() === 3) {
      this.setPlayerIndex(2);
      setTimeout(() => {
        this.setPlayerIndex(0);
      }, 3000);
    }
  }

  private getVPN(): void {
    if (this.tileMaps.getPowerUpChoice() === 2) {
      this.setPlayerIndex(1);
      setTimeout(() => {
        this.setPlayerIndex(0);
      }, 3000);
    }
  }
}
