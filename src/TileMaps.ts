import BlankTile from './BlankTile.js';
import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import GameMap from './GameMap.js';
import LockTile from './LockTile.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import PowerUps from './PowerUps.js';
import Player from './Player.js';
import PortalTile from './PortalTile.js';
import RandomBoxTile from './RandomBoxTile.js';
import StrongWallTile from './StrongWallTile.js';
import WallTile from './WallTile.js';
import Level from './Level.js';
import CookiesTile from './CookiesTile.js';

export default class TileMaps {
  private tileSize: number;

  protected game: Game;

  private gameMap: GameMap[];

  private activeMap: number;

  private wallTile: WallTile;

  private blankTile: BlankTile;

  private cookiesTile: CookiesTile;

  private portalTile: PortalTile;

  private lockTile: LockTile;

  private randomBoxTile: RandomBoxTile;

  private strongWallTile: StrongWallTile;

  private tile: number;

  private row: number;

  private column: number;

  private timer: number;

  private powerUpChoice: number;

  private powerUp: PowerUps;

  private enemyCount: number;

  private level: Level;

  private player: Player;

  public static powerUpActive: boolean;

  public static powerUpOneActive: boolean;

  public static powerUpTwoActive: boolean;

  public static powerUpThreeActive: boolean;

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    // Game Class
    this.game = game;

    // Basic Tile
    this.wallTile = new WallTile();
    this.blankTile = new BlankTile();
    this.cookiesTile = new CookiesTile();
    this.portalTile = new PortalTile();
    this.lockTile = new LockTile();

    // Effects Tile
    this.randomBoxTile = new RandomBoxTile();
    this.strongWallTile = new StrongWallTile();

    // Game Map
    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();
    this.activeMap = 0;

    // Map Row, Column, and Tile
    this.row = 0;
    this.column = 0;
    this.tile = 0;

    // Map Position
    this.tileSize = 32;

    // Power Ups
    this.powerUp = new PowerUps();

    this.enemyCount = this.gameMap[this.activeMap].getEnemyCount();

    TileMaps.powerUpActive = false;
  }

  /**
   * Change map if go to next level
   */
  public nextLevel(): void {
    if (
      this.game.getUserData().getScore() === 364
      && this.gameMap[0].getGameMap()
    ) {
      this.activeMap = 1;
      console.log(this.activeMap);
    }
  }

  /**
   * Getter enemy count from tile map
   *
   * @returns Enemy count
   */
  public getEnemyCount(): number {
    return this.enemyCount;
  }

  /**
   * Draws the Objects according to the MazeMap
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    for (
      let rowTemp = 0;
      rowTemp < this.gameMap[this.activeMap].getGameMap().length;
      rowTemp++
    ) {
      for (
        let columnTemp = 0;
        columnTemp < this.gameMap[this.activeMap].getGameMap()[rowTemp].length;
        columnTemp++
      ) {
        this.row = rowTemp;
        this.column = columnTemp;
        this.tile = this.gameMap[this.activeMap].getGameMap()[this.row][this.column];
        if (this.tile === 0) {
          this.cookiesTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 1) {
          this.wallTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 4) {
          this.powerUp.draw(ctx, this.column, this.row);
        } else if (this.tile === 5) {
          this.blankTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 8) {
          this.lockTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 9) {
          this.portalTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 43) {
          this.strongWallTile.draw(ctx, this.column, this.row);
        }
      }
    }
    // console.log(this.game.getUserData().getDisplayedPassword());
    this.game.writeTextToCanvas(
      `Password: ${this.game.getUserData().getDisplayedPassword()}`,
      this.game.canvas.width / 2,
      this.game.canvas.height * 0.2,
      40,
    );
  }

  /**
   *
   * @returns Spawn player
   */
  public getPlayer(): Player {
    for (
      let row = 0;
      row < this.gameMap[this.activeMap].getGameMap().length;
      row++
    ) {
      for (
        let column = 0;
        column < this.gameMap[this.activeMap].getGameMap()[row].length;
        column++
      ) {
        const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
        if (tile === 2) {
          this.gameMap[this.activeMap].getGameMap()[row][column] = 0;
          return new Player(
            (column * this.tileSize),
            (row * this.tileSize),
            this.tileSize,
            this,
            this.gameMap[this.activeMap],
          );
        }
      }
    }
    return null;
  }

  /**
   *
   * @returns Spawn enemies
   */
  public spawnEnemy(): EnemyVirus {
    for (
      let row = 0;
      row < this.gameMap[this.activeMap].getGameMap().length;
      row++
    ) {
      for (
        let column = 0;
        column < this.gameMap[this.activeMap].getGameMap()[row].length;
        column++
      ) {
        const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
        if (tile === 3) {
          this.gameMap[this.activeMap].setGameMap(row, column, 0);
          return new EnemyVirus(
            (column * this.tileSize),
            (row * this.tileSize),
            this.tileSize,
            this,
            this.gameMap[this.activeMap],
          );
        }
      }
    }
    return null;
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @param direction Move direction
   * @returns Check colliding with wall or not
   */
  public collideWithEnvironment(x: number, y: number, direction: number): boolean {
    if (
      Number.isInteger(x / this.tileSize)
      && Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.getMDRight():
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.getMDLeft():
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.getMDUp():
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.getMDDown():
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        default:
          break;
      }
      const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
      if (tile === 1 || tile === 42 || tile === 43) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @returns Change tile to cookies or not
   */
  public changeCookies(x: number, y: number): boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 0) {
        this.gameMap[this.activeMap].setGameMap(row, column, 5);
        this.game.getUserData().addScore(1);
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @returns Check random power up
   */
  public randomPowerUp(x: number, y: number): boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 4) {
        if (TileMaps.powerUpActive === false) {
          this.gameMap[this.activeMap].setGameMap(row, column, 5);
          this.powerUpChoice = Game.randomNumber(1, 3);
          this.setPowerUp();
        }
        return true;
      }
    }
    return false;
  }

  private setPowerUp(): void {
    if (this.powerUpChoice === 1) {
      this.powerUp.setFireWall(this.gameMap[this.activeMap]);
      this.powerUp.clearFireWall(this.gameMap[this.activeMap]);
      TileMaps.powerUpOneActive = true;

      this.resetPowerUp();
    }
    if (this.powerUpChoice === 2) {
      this.resetPowerUp();
      TileMaps.powerUpTwoActive = true;
    }
    if (this.powerUpChoice === 3) {
      this.resetPowerUp();
      TileMaps.powerUpThreeActive = true;
    }
  }

  private resetPowerUp() {
    setTimeout(() => {
      this.powerUpChoice = 0;
    }, 0);
  }

  /**
   *
   * @returns The power up
   */
  public getPowerUpChoice(): number {
    return this.powerUpChoice;
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @returns Player teleport position
   */
  public teleportPlayer(x: number, y: number): number {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 9) {
        return this.gameMap[this.activeMap].getGameMap()[row].length;
      }
    }
    return null;
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @returns Player teleport position
   */
  public collideWithPassword(x: number, y: number): boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 8) {
        return true;
      }
    }
    return false;
  }
}
