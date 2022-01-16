import Game from './Game.js';

export default abstract class TileObjects {
  protected img: HTMLImageElement;

  private rowPos: number;

  private columnPos: number;

  private tileSize: number;

  public constructor(imageSrc: string) {
    this.tileSize = 32;
    this.img = Game.loadNewImage(imageSrc);
  }

  /**
   * getXPos
   *
   * @returns the current X-position
   */
  public getXPos(): number {
    return this.rowPos;
  }

  /**
   * getYPos
   *
   * @returns the current Y-position
   */
  public getYPos(): number {
    return this.columnPos;
  }

  /**
   *
   * @param ctx Canvas Rendering Context 2D
   * @param row Map Row
   * @param column Map Column
   */
  public draw(ctx: CanvasRenderingContext2D, row: number, column: number): void {
    ctx.drawImage(
      this.img,
      (row * this.tileSize) + 300,
      (column * this.tileSize) + 200,
      this.tileSize,
      this.tileSize,
    );
  }
}
