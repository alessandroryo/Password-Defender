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

  private playerNormal: string;

  private playerMask: string;

  private playerAV: string;

  private playerImages: string[];

  private playerImagesIndex: number;

  private vpnActive: boolean;

  private vpnExpire: boolean;

  private vpnTimers: number[];

  private avActive: boolean;

  private avExpire: boolean;

  private avTimers: number[];

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

    this.vpnActive = false;
    this.vpnExpire = false;
    this.vpnTimers = [];

    this.avActive = false;
    this.avExpire = false;
    this.avTimers = [];
  }

  private setPlayerIndex(type: number): void {
    this.playerImagesIndex = type;
  }

  private loadPlayerImages(): void {
    this.playerNormal = localStorage.getItem('playerSkinSrc');
    this.playerMask = './assets/img/Linux-Logo-(Transparent).png';
    this.playerAV = './assets/img/Linux-Logo-(Antivirus).png';

    this.playerImages = [
      this.playerNormal,
      this.playerMask,
      this.playerAV,
    ];
  }

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

  private useVPN(): void {
    if (this.tileMaps.getPowerUpChoice() === 2) {
      this.setPlayerIndex(1);
      setTimeout(() => {
        this.setPlayerIndex(0);
      }, 1000 * 6);

      // Active time
      this.vpnActive = true;
      this.vpnExpire = false;
      this.vpnTimers.forEach((timer) => clearTimeout(timer));
      this.vpnTimers = [];

      const vpnTimer = setTimeout(() => {
        this.vpnActive = false;
        this.vpnExpire = false;
      }, 1000 * 6);

      this.vpnTimers.push(vpnTimer);

      const vpnExpireTimer = setTimeout(() => {
        this.vpnExpire = true;
      }, 0);

      this.vpnTimers.push(vpnExpireTimer);
    }
  }

  private useAntivirus(): void {
    if (this.tileMaps.getPowerUpChoice() === 3) {
      // Change player image
      this.setPlayerIndex(2);
      setTimeout(() => {
        this.setPlayerIndex(0);
      }, 1000 * 6);

      // Active time
      this.avActive = true;
      this.avExpire = false;
      this.avTimers.forEach((timer) => clearTimeout(timer));
      this.avTimers = [];

      const avTimer = setTimeout(() => {
        this.avActive = false;
        this.avExpire = false;
      }, 1000 * 6);

      this.avTimers.push(avTimer);

      const avExpireTimer = setTimeout(() => {
        this.avExpire = true;
      }, 0);

      this.avTimers.push(avExpireTimer);
    }
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
    this.useVPN();
    this.useAntivirus();
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
   * Method for check if player collide with enemy
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
      ) {
        collides = enemy;
      }
    });
    return collides;
  }

  /**
   * Method for player to eat enemy virus and remove it from array
   *
   * @param enemyVirus Enemy virus class
   */
  public eatVirus(enemyVirus: EnemyVirus[]) : void {
    if (this.avActive) {
      const collideEnemies = enemyVirus.filter((enemy) => enemy.collideWith(this));
      collideEnemies.forEach((enemy) => {
        enemyVirus.splice(enemyVirus.indexOf(enemy), 1);
      });
    }
  }

  /**
   * Getter for check VPN activation
   *
   * @returns VPN active
   */
  public getVPNActive() : boolean {
    return this.vpnActive;
  }

  /**
   * Getter for check antivirus activation
   *
   * @returns VPN active
   */
  public getAVActive() : boolean {
    return this.avActive;
  }

  /**
   * Getter for player x position
   *
   * @returns player x position
   */
  public getXPos() : number {
    return this.x;
  }

  /**
   * Getter for player y position
   *
   * @returns player y position
   */
  public getYPos() : number {
    return this.y;
  }
}
