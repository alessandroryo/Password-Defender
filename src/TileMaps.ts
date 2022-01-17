import AntiVirusTile from './AntiVirusTile.js';
import BlankTile from './BlankTile.js';
import CookiesDot from './CookiesDot.js';
import EnemyVirus from './EnemyVirus.js';
import FireWallTile from './FireWallTile.js';
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
import VPNTile from './VPNTile.js';
import WallTile from './WallTile.js';

export default class TileMaps {
  private tileSizeHeight: number;

  private tileSizeWidth: number;

  protected game: Game;

  private gameMap: GameMap[];

  private activeMap: number;

  private wallTile: WallTile;

  private blankTile: BlankTile;

  private cookiesTile: CookiesDot;

  private portalTile: PortalTile;

  private lockTile: LockTile;

  private randomBoxTile: RandomBoxTile;

  private strongWallTile: StrongWallTile;

  private antiVirusTile: AntiVirusTile;

  private fireWallTile: FireWallTile;

  private vpnTile: VPNTile;

  private tile: number;

  private row: number;

  private column: number;

  private timer: number;

  private heightRatio: number;

  private widthRatio: number;

  private powerUpChoice: number;

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
    this.cookiesTile = new CookiesDot();
    this.portalTile = new PortalTile();
    this.lockTile = new LockTile();

    // Power Ups Tile
    this.antiVirusTile = new AntiVirusTile();
    this.fireWallTile = new FireWallTile();
    this.vpnTile = new VPNTile();

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
    this.heightRatio = 300;
    this.widthRatio = 200;
    // this.tileSizeHeight = this.game.canvas.height * 0.035;
    this.tileSizeHeight = 32;
    this.tileSizeWidth = 32;
  }

  private loopRowColumn() {
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
      }
    }
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
          this.cookiesTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 1) {
          this.wallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 4) {
          this.randomBoxTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 5) {
          this.blankTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 6) {
          this.fireWallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 7) {
          this.antiVirusTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 8) {
          this.lockTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 9) {
          this.portalTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 10) {
          this.vpnTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
        } else if (this.tile === 43) {
          this.strongWallTile.draw(ctx, this.column, this.row, this.heightRatio, this.widthRatio, this.tileSizeHeight, this.tileSizeWidth);
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
   * @param velocity Player velocity
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
            (column * this.tileSizeHeight),
            (row * this.tileSizeHeight),
            this.tileSizeHeight,
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
  public getEnemies(): EnemyVirus {
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
            (column * this.tileSizeWidth),
            (row * this.tileSizeHeight),
            this.tileSizeHeight,
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
      Number.isInteger(x / this.tileSizeWidth)
      && Number.isInteger(y / this.tileSizeHeight)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.getMDRight():
          nextColumn = x + this.tileSizeWidth;
          column = nextColumn / this.tileSizeHeight;
          row = y / this.tileSizeHeight;
          break;
        case MovingDirection.getMDLeft():
          nextColumn = x - this.tileSizeWidth;
          column = nextColumn / this.tileSizeHeight;
          row = y / this.tileSizeHeight;
          break;
        case MovingDirection.getMDUp():
          nextRow = y - this.tileSizeHeight;
          row = nextRow / this.tileSizeHeight;
          column = x / this.tileSizeWidth;
          break;
        case MovingDirection.getMDDown():
          nextRow = y + this.tileSizeHeight;
          row = nextRow / this.tileSizeHeight;
          column = x / this.tileSizeWidth;
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
    const column = x / this.tileSizeWidth;
    const row = y / this.tileSizeHeight;
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
    const column = x / this.tileSizeWidth;
    const row = y / this.tileSizeHeight;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 4) {
        this.gameMap[this.activeMap].setGameMap(row, column, 5);
        this.powerUpChoice = Game.randomNumber(0, 2);
        console.log(this.powerUpChoice);
        if (this.powerUpChoice === 0) {
          this.setFireWall();
          this.clearFireWall();
        } else if (this.powerUpChoice === 1) {
          console.log('VPN');
        } else if (this.powerUpChoice === 2) {
          console.log('AntiV');
        }
        return true;
      }
    }
    return false;
  }

  private setFireWall(): void {
    setTimeout(() => {
      this.gameMap[this.activeMap].setGameMap(8, 18, 43);
      this.gameMap[this.activeMap].setGameMap(8, 21, 43);
    }, 500);
  }

  private clearFireWall(): void {
    setTimeout(() => {
      this.gameMap[this.activeMap].setGameMap(8, 18, 5);
      this.gameMap[this.activeMap].setGameMap(8, 21, 5);
    }, 5000);
  }

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @returns Player teleport position
   */
  public teleportPlayer(x: number, y: number): number {
    const column = x / this.tileSizeWidth;
    const row = y / this.tileSizeHeight;
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
    const column = x / this.tileSizeWidth;
    const row = y / this.tileSizeHeight;
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
