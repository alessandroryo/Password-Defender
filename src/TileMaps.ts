import EnemyVirus from './EnemyVirus.js';
import Game from './Game.js';
import GameMap from './GameMap.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import MovingDirection from './MovingDirection.js';
import Player from './Player.js';

export default class TileMaps {
  private tileSize: number;

  private cookiesDot: HTMLImageElement;

  private blankDot: HTMLImageElement;

  private wall: HTMLImageElement;

  private portal: HTMLImageElement;

  private passLock: HTMLImageElement;

  private gameMap: GameMap[];

  private game: Game;

  private activeMap: number;

  private enemies: EnemyVirus[];

  private player: Player;

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    this.game = game;
    this.tileSize = 32;

    this.cookiesDot = Game.loadNewImage('./assets/img/CookieDot.png');
    this.blankDot = Game.loadNewImage('./assets/img/BlankDot.png');
    this.wall = Game.loadNewImage('./assets/img/Wall.png');
    this.portal = Game.loadNewImage('./assets/img/Portal.png');
    this.passLock = Game.loadNewImage('./assets/img/Lock-Password.png');

    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();

    this.activeMap = 0;

    this.enemies = [];
  }

  /**
   * Draws the Objects according to the MazeMap
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D) : void {
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
        if (tile === 1) {
          this.drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.drawDot(ctx, column, row, this.tileSize);
        } else if (tile === 5) {
          this.drawBlank(ctx, column, row, this.tileSize);
        } else if (tile === 8) {
          this.drawLock(ctx, column, row, this.tileSize);
        } else if (tile === 9) {
          this.drawPortal(ctx, column, row, this.tileSize);
        }
      }
    }
    // console.log(this.game.getUserData().getDisplayedPassword());
    this.game.writeTextToCanvas(this.game.getUserData().getDisplayedPassword(), 939, 476, 14, 'white');
  }

  private drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.wall,
      (column * this.tileSize) + 300,
      (row * this.tileSize) + 200,
      size,
      size,
    );
  }

  private drawDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.cookiesDot,
      (column * this.tileSize) + 300,
      (row * this.tileSize) + 200,
      size,
      size,
    );
  }

  private drawBlank(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.blankDot,
      ((column * this.tileSize) + 300),
      ((row * this.tileSize) + 200),
      size,
      size,
    );
  }

  private drawPortal(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.portal,
      ((column * this.tileSize) + 300),
      ((row * this.tileSize) + 200),
      size,
      size,
    );
  }

  private drawLock(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.passLock,
      ((column * this.tileSize) + 300),
      ((row * this.tileSize) + 200),
      size,
      size,
    );
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

  /**
   *
   * @param x X Position
   * @param y Y Position
   * @param direction Move direction
   * @returns Check colliding with wall or not
   */
  public collideWithEnvironment(x: number, y: number, direction: number) : boolean {
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
      if (tile === 1 || tile === 42) {
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
  public changeCookies(x: number, y: number) : boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 0) {
        this.gameMap[this.activeMap].getGameMap()[row][column] = 5;
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
   * @returns Player teleport position
   */
  public teleportPlayer(x: number, y: number) : number {
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
  public collideWithPassword(x: number, y: number) : boolean {
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
