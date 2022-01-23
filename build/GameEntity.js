export default class GameEntity {
    column;
    row;
    tileSize;
    velocity;
    tileMaps;
    gameMap;
    constructor(column, row, tileSize, tileMaps, gameMap) {
        this.column = column;
        this.row = row;
        this.tileSize = tileSize;
        this.tileMaps = tileMaps;
        this.gameMap = gameMap;
    }
}
//# sourceMappingURL=GameEntity.js.map