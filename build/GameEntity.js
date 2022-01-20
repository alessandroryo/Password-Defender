export default class GameEntity {
    x;
    y;
    tileSize;
    velocity;
    tileMaps;
    gameMap;
    constructor(x, y, tileSize, tileMaps, gameMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.tileMaps = tileMaps;
        this.gameMap = gameMap;
    }
}
//# sourceMappingURL=GameEntity.js.map