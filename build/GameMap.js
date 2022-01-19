export default class GameMap {
    gameMap;
    enemyCount() {
        const enemyCount = [];
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
    getGameMap() {
        return this.gameMap;
    }
    setGameMap(row, column, type) {
        this.gameMap[row][column] = type;
    }
    getEnemyCount() {
        return this.enemyCount().length;
    }
}
//# sourceMappingURL=GameMap.js.map