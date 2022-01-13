import TileMaps from './TileMaps.js';
import Game from './Game.js';
import GameMap from './GameMap.js';

export default class PowerUps {
  private x: number;

  private y: number;

  private tileSize: number;

  private tileMap: TileMaps;

  private spawnTimerDefault: number;

  private spawnTimer: number;

  private powerupsOnField: number[];

  private gameMap: GameMap;

  private activeMap: number;

  private powerUpActivity: number;

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
    this.spawnTimerDefault = 20;
    this.spawnTimer = this.spawnTimerDefault;

    this.activeMap = 0;
    this.powerUpActivity = 0;
  }

  /**
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      Game.loadNewImage('./assets/img/Random-Box.png'),
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
    this.powerupsOnField = this.gameMap.getGameMap()[this.activeMap].filter(element => element > 4);
    if (this.powerupsOnField.length > 1) {
      return true;
      console.log('true');
    }
    return false;
    console.log('false');
  }

  /**
   *
   * @returns
   */
  private checkIfPowerUpActive(): boolean {
    if (this.powerUpActivity === 1) {
      return true;
    }
    return false;
  }

  // /**
  //  * Checks if there are four or less powerup
  //  */
  // private spawnPowerUps(): void {
  //   if (this.checkIfPowerUpActive() === false && this.checkForPowerUps() === false) {
  //     this.draw(this.game.ctx);
  //   }
  // }
}
