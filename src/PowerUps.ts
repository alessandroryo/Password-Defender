import Game from './Game.js';
import GameMap from './GameMap.js';

export default class PowerUps {
  private tileSize: number;

  private gameMap: GameMap;

  /**
   * Construct power up class
   *
   * @param gameMap Game map
   */
  constructor(gameMap: GameMap) {
    this.gameMap = gameMap;
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

  /**
   * Make strong wall in game map
   */
  public setFireWall(): void {
    setTimeout(() => {
      this.gameMap.setGameMap(8, 18, 43);
      this.gameMap.setGameMap(8, 21, 43);
    }, 500);
  }

  /**
   * Clear strong wall in game map
   */
  public clearFireWall(): void {
    setTimeout(() => {
      this.gameMap.setGameMap(8, 18, 5);
      this.gameMap.setGameMap(8, 21, 5);
    }, 5000);
  }
}
