import Game from './Game.js';

export default abstract class TileObjects {
  protected img: HTMLImageElement;

  private rowPos: number;

  private columnPos: number;

  private tileSize: number;

  private game: Game;

  /**
   * Construct tile objects
   *
   * @param imageSrc Image source
   */
  public constructor(imageSrc: string) {
    this.img = Game.loadNewImage(imageSrc);
    this.tileSize = window.innerWidth / 60;
  }

  /**
   *
   * @param ctx Canvas Rendering Context 2D
   * @param column Map column
   * @param row Map row
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    column: number,
    row: number,
  ): void {
    ctx.drawImage(
      this.img,
      (column * this.tileSize) + (window.innerWidth / 6),
      (row * this.tileSize) + (window.innerHeight / 5),
      this.tileSize,
      this.tileSize,
    );
  }
}
