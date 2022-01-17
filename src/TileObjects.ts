import Game from './Game.js';

export default abstract class TileObjects {
  protected img: HTMLImageElement;

  private rowPos: number;

  private columnPos: number;

  public constructor(imageSrc: string) {
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
   * @param heightRatio Height Ratio
   * @param widthRatio Width Ratio
   * @param tileSizeHeight
   * @param tileSizeWidth
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    row: number,
    column: number,
    heightRatio: number,
    widthRatio: number,
    tileSizeHeight: number,
    tileSizeWidth: number,
  ): void {
    ctx.drawImage(
      this.img,
      (row * tileSizeHeight) + heightRatio,
      (column * tileSizeWidth) + widthRatio,
      tileSizeWidth,
      tileSizeHeight,
    );
  }
}
