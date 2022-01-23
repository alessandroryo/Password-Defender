import Game from './Game.js';
export default class PowerUps {
    tileSize;
    constructor() {
        this.tileSize = window.innerWidth / 60;
    }
    draw(ctx, row, column) {
        ctx.drawImage(Game.loadNewImage('./assets/img/Random-Box.png'), (row * this.tileSize) + (window.innerWidth / 6), (column * this.tileSize) + (window.innerHeight / 5), this.tileSize, this.tileSize);
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