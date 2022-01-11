export default abstract class GameMap {
  protected gameMap: number[][];

  public getGameMap() : number[][] {
    return this.gameMap;
  }

  public setGameMap(row: number, column: number, type: number) : void {
    this.gameMap[row][column] = type;
  }
}
