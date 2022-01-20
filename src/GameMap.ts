export default abstract class GameMap {
  protected gameMap: number[][];

  private enemyCount(): number[] {
    const enemyCount: number[] = [];
    for (let index = 0; index < this.gameMap.length; index++) {
      const check = this.gameMap[index].filter((filter) => filter === 3);
      if (check !== []) {
        check.forEach((element) => {
          enemyCount.push(element);
        });
      }
    }
    return enemyCount;
  }

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

  /**
   * Getter enemy count from map 1 and 2
   *
   * @returns Enemy count
   */
  public getEnemyCount(): number {
    return this.enemyCount().length;
  }
}
