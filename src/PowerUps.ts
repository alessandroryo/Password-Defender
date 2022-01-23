import Game from './Game.js';
import GameMap from './GameMap.js';

export default class PowerUps {
  private tileSize: number;

  /**
   * Construct power up class
   *
   */
  constructor() {
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
      Game.loadNewImage('./assets/img/Random-Box.png'),
      (column * this.tileSize) + (window.innerWidth / 6),
      (row * this.tileSize) + (window.innerHeight / 5),
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Make strong wall in game map
   *
   * @param gameMap Game Map
   */
  // eslint-disable-next-line class-methods-use-this
  public setFireWall(gameMap: GameMap): void {
    setTimeout(() => {
      gameMap.setGameMap(8, 18, 43);
      gameMap.setGameMap(8, 21, 43);
    }, 500);
  }

  /**
   * Clear strong wall in game map
   *
   * @param gameMap Game Map
   */
  // eslint-disable-next-line class-methods-use-this
  public clearFireWall(gameMap: GameMap): void {
    setTimeout(() => {
      gameMap.setGameMap(8, 18, 5);
      gameMap.setGameMap(8, 21, 5);
    }, 9000);
  }
}
