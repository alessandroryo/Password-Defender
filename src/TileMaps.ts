import Game from './Game.js';
import GameMap from './GameMap.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';

export default class TileMaps {
  private tileSize: number;

  private yellowDot: HTMLImageElement;

  private wall: HTMLImageElement;

  private gameMap: GameMap[];

  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.tileSize = 32;
    this.yellowDot = new Image();
    this.yellowDot.src = './assets/img/CookieDot.png';

    this.wall = new Image();
    this.wall.src = './assets/img/Wall.png';

    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();
  }

  // public draw(ctx: CanvasRenderingContext2D) : void {
  //   for (let row = 0; row < this.gameMap[0].getGameMap().length; row++) {
  //     for (let column = 0; column < this.gameMap[0].getGameMap()[row].length; column++) {
  //       const tile = this.gameMap[0].getGameMap()[row][column];
  //       if (tile === 1) {
  //         this.drawWall(ctx, column, row, this.tileSize);
  //       } else if (tile === 0) {
  //         this.drawDot(ctx, column, row, this.tileSize);
  //       }
  //     }
  //   }
  // }

  public draw(ctx: CanvasRenderingContext2D) : void {
    const activeMap = 0;
    for (let row = 0; row < this.gameMap[activeMap].getGameMap().length; row++) {
      for (let column = 0; column < this.gameMap[activeMap].getGameMap()[row].length; column++) {
        const tile = this.gameMap[activeMap].getGameMap()[row][column];
        if (tile === 1) {
          this.drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.drawDot(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  private drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.wall,
      (column * this.tileSize) + this.game.canvas.width / 3,
      (row * this.tileSize) + 200,
      size,
      size,
    );
  }

  private drawDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(
      this.yellowDot,
      (column * this.tileSize) + this.game.canvas.width / 3,
      (row * this.tileSize) + 200,
      size,
      size,
    );
  }
}
