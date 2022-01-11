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

  private gameMap: GameMap[];

  private game: Game;

  private activeMap: number;

  private enemies: EnemyVirus[];

  constructor(game: Game) {
    this.game = game;
    this.tileSize = 32;

    this.cookiesDot = new Image();
    this.cookiesDot.src = './assets/img/CookieDot.png';

    this.blankDot = new Image();
    this.blankDot.src = './assets/img/BlankDot.png';

    this.wall = new Image();
    this.wall.src = './assets/img/Wall.png';

    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();

    this.activeMap = 1;

    this.enemies = [];
  }

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
        } else {
          this.drawBlank(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  private drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.wall,
      (column * this.tileSize),
      (row * this.tileSize),
      size,
      size,
    );
  }

  private drawDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.cookiesDot,
      (column * this.tileSize),
      (row * this.tileSize),
      size,
      size,
    );
  }

  private drawBlank(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.blankDot,
      (column * this.tileSize),
      (row * this.tileSize),
      size,
      size,
    );
  }

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
            column * this.tileSize,
            row * this.tileSize,
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
            column * this.tileSize,
            row * this.tileSize,
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
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }

  public eatCookies(x: number, y: number) : boolean {
    const column = x / this.tileSize;
    const row = y / this.tileSize;
    if (
      Number.isInteger(row)
      && Number.isInteger(column)
    ) {
      if (this.gameMap[this.activeMap].getGameMap()[row][column] === 0) {
        this.gameMap[this.activeMap].getGameMap()[row][column] = 5;
        return true;
      }
    }
    return false;
  }
}
