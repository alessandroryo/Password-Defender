import Game from './Game.js';
import GameMap from './GameMap.js';
import MapOne from './MapOne.js';
import MapTwo from './MapTwo.js';
import TileMaps from './TileMaps.js';

export default abstract class TileObjects {
  protected img: HTMLImageElement;

  private rowPos: number;

  private columnPos: number;

  private row: number;

  private column: number;

  private tileSize: number;

  private gameMap: GameMap[];

  private activeMap: number;

  private type: number;

  public constructor(imageSrc: string) {
    this.activeMap = 0;
    this.tileSize = 32;
    this.img = Game.loadNewImage(imageSrc);

    this.gameMap = [];
    this.gameMap[0] = new MapOne();
    this.gameMap[1] = new MapTwo();

    console.log(this.gameMap[this.activeMap].getGameMap().length);
    for (
      this.rowPos = 0;
      this.rowPos < this.gameMap[this.activeMap].getGameMap().length;
      this.rowPos++
    ) {
      for (
        this.columnPos = 0;
        this.columnPos < this.gameMap[this.activeMap].getGameMap()[this.rowPos].length;
        this.columnPos++
      ) {
        this.row = this.rowPos;
        this.column = this.columnPos;
      }
    }
  }

  // private mapPosition() {
  // }

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
   * draw
   *
   * @param ctx the rendering context to draw on
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.img,
      (this.row * this.tileSize) + 300,
      (this.column * this.tileSize) + 200,
      this.tileSize,
      this.tileSize,
    );
  }
}
