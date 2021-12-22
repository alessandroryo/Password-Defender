import Game from './Game.js';

export default class TileMaps {
  private tileSize: number;

  private yellowDot: HTMLImageElement;

  private wall: HTMLImageElement;

  public mapMaze: number[][];

  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.tileSize = 32;
    this.yellowDot = Game.loadNewImage('./assets/img/Cookie.png');

    this.wall = Game.loadNewImage('./assets/img/Wall.png');

    this.mapMaze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
  }

  public draw(ctx: CanvasRenderingContext2D) : void {
    for (let row = 0; row < this.mapMaze.length; row++) {
      for (let column = 0; column < this.mapMaze[row].length; column++) {
        const tile = this.mapMaze[row][column];
        if (tile === 1) {
          this.drawWall(ctx, column, row, this.tileSize);
        } else if (tile === 0) {
          this.drawDot(ctx, column, row, this.tileSize);
        }
      }
    }
  }

  private drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(this.wall, (column * this.tileSize) + this.game.canvas.width / 3, (row * this.tileSize) + 200,
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
