import BlankTile from './BlankTile.js';
import CookiesDot from './CookiesDot.js';
import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import GameMap from './GameMap.js';
import LockTile from './LockTile.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';
import PortalTile from './PortalTile.js';
import RandomBoxTile from './RandomBoxTile.js';
import StrongWallTile from './StrongWallTile.js';
import WallTile from './WallTile.js';

export default class TileMaps {
  protected tileSize: number;

  private gameMap: GameMap[];

  protected game: Game;

  private activeMap: number;

  private wallTile: WallTile;

  private blankTile: BlankTile;

  private cookiesTile: CookiesDot;

  private portalTile: PortalTile;

  private lockTile: LockTile;

  private randomBoxTile: RandomBoxTile;

  private strongWallTile: StrongWallTile;

  private tile: number;

  private row: number;

  private column: number;

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    this.game = game;
    this.tileSize = 32;

    this.wallTile = new WallTile();
    this.blankTile = new BlankTile();
    this.cookiesTile = new CookiesDot();
    this.portalTile = new PortalTile();
    this.lockTile = new LockTile();
    this.randomBoxTile = new RandomBoxTile();
    this.strongWallTile = new StrongWallTile();

    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();
    this.activeMap = 0;
  }

  /**
   * Draws the Objects according to the MazeMap
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    for (
      this.row = 0;
      this.row < this.gameMap[this.activeMap].getGameMap().length;
      this.row++
    ) {
      for (
        this.column = 0;
        this.column < this.gameMap[this.activeMap].getGameMap()[this.row].length;
        this.column++
      ) {
        this.tile = this.gameMap[this.activeMap].getGameMap()[this.row][this.column];
        if (this.tile === 1) {
          this.wallTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 0) {
          this.cookiesTile.draw(ctx, this.column, this.row);
        } else if (this.tile === 4) {
          this.randomBoxTile.draw(ctx, this.column, this.row);
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
    this.game.writeTextToCanvas(this.game.getUserData().getDisplayedPassword(), 939, 476, 14, 'white');
  }

  /**
   *
   * @param velocity Player velocity
   * @returns Spawn player
   */
  public getPlayer(velocity: number): Player {
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
            velocity,
            this.gameMap[this.activeMap],
            this,
          );
        }
      }
    }
    return null;
  }

  /**
   *
   * @param velocity Enemy velocity
   * @returns Spawn enemies
   */
  public getEnemies(velocity: number): EnemyVirus {
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
            velocity,
            this,
          );
        }
      }
    }
    return null;
  }

  // /**
  //  *
  //  * @param velocity Enemy velocity
  //  * @returns Spawn enemies
  //  */
  // public getPowerUps(): PowerUps {
  //   for (
  //     let row = 0;
  //     row < this.gameMap[this.activeMap].getGameMap().length;
  //     row++
  //   ) {
  //     for (
  //       let column = 0;
  //       column < this.gameMap[this.activeMap].getGameMap()[row].length;
  //       column++
  //     ) {
  //       const tile = this.gameMap[this.activeMap].getGameMap()[row][column];
  //       if (
  //         tile === 4
  //       ) {
  //         this.gameMap[this.activeMap].setGameMap(row, column, 5);
  //         return new PowerUps(
  //           (column * this.tileSize),
  //           (row * this.tileSize),
  //           this.tileSize,
  //           this,
  //         );
  //       }
  //     }
  //   }
  //   return null;
  // }

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
   * @returns Change tile to cookies or not
   */
  public changePowerup(x: number, y: number): boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 4) {
        this.gameMap[this.activeMap].setGameMap(row, column, 5);
        this.gameMap[this.activeMap].setGameMap(12, 18, 43);
        this.gameMap[this.activeMap].setGameMap(12, 19, 43);
        this.gameMap[this.activeMap].setGameMap(12, 20, 43);
        this.gameMap[this.activeMap].setGameMap(12, 21, 43);
        // setInterval(this.PowerUps.ClearFireWall, 1000);
        return true;
      }
    }
    return false;
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
        console.log('collideWithPassword');
        return true;
      }
    }
    return false;
  }
}
