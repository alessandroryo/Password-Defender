import Game from './Game.js';
export default class PowerUps {
    tileSize;
    gameMap;
    constructor(gameMap) {
        this.gameMap = gameMap;
        this.tileSize = 32;
    }
    draw(ctx, row, column) {
        ctx.drawImage(Game.loadNewImage('./assets/img/Random-Box.png'), (row * this.tileSize) + 300, (column * this.tileSize) + 200, this.tileSize, this.tileSize);
    }
    setFireWall() {
        setTimeout(() => {
            this.gameMap.setGameMap(8, 18, 43);
            this.gameMap.setGameMap(8, 21, 43);
        }, 500);
    }
    clearFireWall() {
        setTimeout(() => {
            this.gameMap.setGameMap(8, 18, 5);
            this.gameMap.setGameMap(8, 21, 5);
        }, 9000);
    }
}
//# sourceMappingURL=PowerUps.js.map