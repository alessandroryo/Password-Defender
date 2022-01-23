import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import GameEntity from './GameEntity.js';
import GameMap from './GameMap.js';
import KeyListener from './KeyboardListener.js';
import MovingDirection from './MovingDirection.js';
import TileMaps from './TileMaps.js';
import PowerupPopup from './PowerupPopup.js';

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
   * @param column Player column position
   * @param row Player row position
   * @param tileSize Player tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    column: number,
    row: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    super(
      column,
      row,
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
    if (this.tileMaps.teleportPlayer(this.column, this.row) !== null) {
      // console.log('tp');
      if (
        this.currentMovingDirection === MovingDirection.getMDLeft()
        && this.column <= 33
      ) {
        this.column += (this.tileMaps.teleportPlayer(this.column, this.row) * 32);
        this.column -= 98;
      } else if (
        this.currentMovingDirection === MovingDirection.getMDRight()
        && this.column >= 64
      ) {
        this.column -= (this.tileMaps.teleportPlayer(this.column, this.row) * 32);
        this.column += 98;
      }
    }
  }

  private eatCookies(): void {
    if (this.tileMaps.changeCookies(this.column, this.row)) {
      this.eatCookiesSound.play();
    }
  }

  private eatPower(): void {
    if (this.tileMaps.randomPowerUp(this.column, this.row)) {
      this.eatCookiesSound.play();
    }
  }

  private useVPN(): void {
    if (PowerupPopup.powerUpAfterDisplay === 2 && TileMaps.powerUpActive === false) {
      this.setPlayerIndex(1);
      TileMaps.powerUpActive = true;
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
        TileMaps.powerUpActive = false;
      }, 1000 * 6);

      this.vpnTimers.push(vpnTimer);

      const vpnExpireTimer = setTimeout(() => {
        this.vpnExpire = true;
      }, 0);

      this.vpnTimers.push(vpnExpireTimer);
      PowerupPopup.powerUpAfterDisplay = 0;
    }
  }

  private useAntivirus(): void {
    if (PowerupPopup.powerUpAfterDisplay === 3 && TileMaps.powerUpActive === false) {
      // Change player image
      this.setPlayerIndex(2);
      TileMaps.powerUpActive = true;
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
        TileMaps.powerUpActive = false;
      }, 1000 * 6);

      this.avTimers.push(avTimer);

      const avExpireTimer = setTimeout(() => {
        this.avExpire = true;
      }, 0);

      this.avTimers.push(avExpireTimer);
      PowerupPopup.powerUpAfterDisplay = 0;
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
      this.column + (window.innerWidth / 6),
      this.row + (window.innerHeight / 5),
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Updating player method
   */
  public update(): void {
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
    if (PowerupPopup.allowedToMove === true) {
      if (this.currentMovingDirection !== this.requestedMovingDirection) {
        if (
          Number.isInteger(this.column / this.tileSize)
          && Number.isInteger(this.row / this.tileSize)
        ) {
          if (
            !this.tileMaps.collideWithEnvironment(
              this.column,
              this.row,
              this.requestedMovingDirection,
            )) {
            this.currentMovingDirection = this.requestedMovingDirection;
          }
        }
      }

      if (this.tileMaps.collideWithEnvironment(
        this.column,
        this.row,
        this.currentMovingDirection,
      )) {
        return;
      }

      // Switch for the other directions requested
      switch (this.currentMovingDirection) {
        case MovingDirection.getMDUp():
          this.row -= this.velocity;
          break;
        case MovingDirection.getMDDown():
          this.row += this.velocity;
          break;
        case MovingDirection.getMDLeft():
          this.column -= this.velocity;
          break;
        case MovingDirection.getMDRight():
          this.column += this.velocity;
          break;
        default:
          break;
      }
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
        (this.column < enemy.getXPos() + size
          && this.column + size > enemy.getXPos()
          && this.row < enemy.getYPos() + size
          && this.row + size > enemy.getYPos())
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
  public eatVirus(enemyVirus: EnemyVirus[]): void {
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
  public getVPNActive(): boolean {
    return this.vpnActive;
  }

  /**
   * Getter for check antivirus activation
   *
   * @returns VPN active
   */
  public getAVActive(): boolean {
    return this.avActive;
  }

  /**
   * Getter for player x position
   *
   * @returns player x position
   */
  public getXPos(): number {
    return this.column;
  }

  /**
   * Getter for player y position
   *
   * @returns player y position
   */
  public getYPos(): number {
    return this.row;
  }
}
