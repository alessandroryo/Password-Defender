export default class GameMap {
    gameMap;
    getGameMap() {
        return this.gameMap;
    }
    setGameMap(row, column, type) {
        console.log(this.gameMap[row][column]);
        this.gameMap[row][column] = type;
    }
}
//# sourceMappingURL=GameMap.js.map