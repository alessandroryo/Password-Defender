import TileMaps from './TileMaps.js';
import Game from './Game.js';

export default class PowerUps {
  private x: number;

  private y: number;

  private tileSize: number;

  private tileMap: TileMaps;

  private SpawnTimerDefault: number;

  private SpawnTimer: number;
  /**
   *
   * @param x PowerUp x position
   * @param y PowerUp y position
   * @param tileSize PowerUp tile size
   * @param tileMap Tile map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    tileMap: TileMaps,
  ) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileMap = tileMap;

     = Math.floor(
      Math.random() * Object.keys().length,
    );
    this.SpawnTimerDefault = 20;
    this.SpawnTimer = this.SpawnTimerDefault;
  }

  /**
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      Game.loadNewImage('./assets/img/'),
      this.x + 300,
      this.y + 200,
      this.tileSize,
      this.tileSize,
    );
  }

  /**
 *
 * checks if there are four or less powerup
 */
  private checkForPowerUps(): boolean {
    if (GameMap) {
      return true;
    }
    return false;
  }

    /**
   *
   * checks if there are four or less powerup
   */
     private checkIfPowerUpActive(): boolean {
  if () {
    return true;
  }
  return false;
}

//       /**
//    *
//    * checks if there are four or less powerup
//    */
//        private checkForPowerUps(): boolean {
//   if () {
//     return true;
//   }
//   return false;
// }
// }
