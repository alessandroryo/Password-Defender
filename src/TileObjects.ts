import Game from './Game.js';

export default abstract class TileObjects {
  protected img: HTMLImageElement;

  private rowPos: number;

  private columnPos: number;

  private tileSize: number;

  public constructor(imageSrc: string) {
    this.img = Game.loadNewImage(imageSrc);
    this.tileSize = 32;
  }

  /**
   *
   * @param ctx Canvas Rendering Context 2D
   * @param row Map Row
   * @param column Map Column
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    column: number,
    row: number,
  ): void {
    ctx.drawImage(
      this.img,
      (column * this.tileSize) + 300,
      (row * this.tileSize) + 200,
      this.tileSize,
      this.tileSize,
    );
  }
}
