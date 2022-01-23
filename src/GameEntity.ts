import GameMap from './GameMap.js';
import TileMaps from './TileMaps.js';

export default abstract class GameEntity {
  protected x: number;

  protected y: number;

  protected tileSize: number;

  protected velocity: number;

  protected tileMaps: TileMaps;

  protected gameMap: GameMap;

  /**
   * Constructor for game entity
   *
   * @param x Game entity x position
   * @param y Game entity y position
   * @param tileSize Game entity tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.tileMaps = tileMaps;
    this.gameMap = gameMap;
  }
}
