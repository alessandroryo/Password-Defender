export default abstract class GameMap {
  protected gameMap: number[][];

  /**
   *
   * @returns game map
   */
  public getGameMap() : number[][] {
    return this.gameMap;
  }

  /**
   *
   * @param row Row position
   * @param column Column position
   * @param type Tile code
   */
  public setGameMap(row: number, column: number, type: number) : void {
    this.gameMap[row][column] = type;
  }
}
