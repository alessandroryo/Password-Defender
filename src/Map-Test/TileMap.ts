export default class TileMap {
  private canvas: HTMLCanvasElement;

  private tileSize: number;

  private yellowDot: HTMLImageElement;

  private wall: HTMLImageElement;

  private mapMaze: number[][];

  constructor() {
    this.tileSize = 32;
    this.yellowDot = new Image();
    this.yellowDot.src = './assets/img/yellowDot.png';

    this.wall = new Image();
    this.wall.src = './assets/img/wall2.png';

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

  

  
  public draw(ctx: CanvasRenderingContext2D) {
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
  
  public drawWall(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
  }
  
  public drawDot(ctx: CanvasRenderingContext2D, column: number, row: number, size: number) {
    ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
  }
  
  public setCanvasSize(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.mapMaze[0].length * this.tileSize;
    this.canvas.height = this.mapMaze.length * this.tileSize;
  }
}
  