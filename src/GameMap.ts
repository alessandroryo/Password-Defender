export default abstract class GameMap {
  protected gameMap: number[][];

  /**
   * Getter for get the game map
   *
   * @returns Game map
   */
  public getGameMap() : number[][] {
    return this.gameMap;
  }

  /**
   * Setter for set the tile code for game map
   *
   * @param row Row position
   * @param column Column position
   * @param type Tile code
   */
  public setGameMap(row: number, column: number, type: number) : void {
    this.gameMap[row][column] = type;
  }

  public abstract getEnemyCount(): number;
}
