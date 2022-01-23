import GameMap from './GameMap.js';
import TileMaps from './TileMaps.js';

export default abstract class GameEntity {
  protected column: number;

  protected row: number;

  protected tileSize: number;

  protected velocity: number;

  protected tileMaps: TileMaps;

  protected gameMap: GameMap;

  /**
   * Constructor for game entity
   *
   * @param column Game entity column position
   * @param row Game entity row position
   * @param tileSize Game entity tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    column: number,
    row: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    this.column = column;
    this.row = row;
    this.tileSize = tileSize;
    this.tileMaps = tileMaps;
    this.gameMap = gameMap;
  }
}
