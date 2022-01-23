import Game from './Game.js';
export default class PowerUps {
    tileSize;
    constructor() {
        this.tileSize = 32;
    }
    draw(ctx, row, column) {
        ctx.drawImage(Game.loadNewImage('./assets/img/Random-Box.png'), (row * this.tileSize) + 300, (column * this.tileSize) + 200, this.tileSize, this.tileSize);
    }
    setFireWall(gameMap) {
        setTimeout(() => {
            gameMap.setGameMap(8, 18, 43);
            gameMap.setGameMap(8, 21, 43);
        }, 500);
    }
    clearFireWall(gameMap) {
        setTimeout(() => {
            gameMap.setGameMap(8, 18, 5);
            gameMap.setGameMap(8, 21, 5);
        }, 9000);
    }
}
//# sourceMappingURL=PowerUps.js.map