import Game from './Game.js';
import GameMap from './GameMap.js';
export default class PowerUps {
  private tileSize: number;

  private gameMap: GameMap;

  constructor(gameMap: GameMap) {
    this.gameMap = gameMap;

    this.tileSize = 32;
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
  ): void {
    ctx.drawImage(
      Game.loadNewImage('./assets/img/Random-Box.png'),
      (row * this.tileSize) + 300,
      (column * this.tileSize) + 200,
      this.tileSize,
      this.tileSize,
    );
  }

  public setFireWall(): void {
    setTimeout(() => {
      this.gameMap.setGameMap(8, 18, 43);
      this.gameMap.setGameMap(8, 21, 43);
    }, 500);
  }

  public clearFireWall(): void {
    setTimeout(() => {
      this.gameMap.setGameMap(8, 18, 5);
      this.gameMap.setGameMap(8, 21, 5);
    }, 5000);
  }
}
