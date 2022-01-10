export default abstract class GameMap {
  protected gameMap: number[][];

  public getGameMap() : number[][] {
    return this.gameMap;
  }

  public setGameMap(row: number, column: number, type: number) : void {
    console.log(this.gameMap[row][column]);
    this.gameMap[row][column] = type;
  }
}
