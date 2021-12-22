import Game from './Game.js';
export default class TileMaps {
    tileSize;
    yellowDot;
    wall;
    mapMaze;
    game;
    constructor(game) {
        this.game = game;
        this.tileSize = 32;
        this.yellowDot = Game.loadNewImage('./assets/img/Cookie.png');
        this.wall = Game.loadNewImage('./assets/img/Wall.png');
        this.mapMaze = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }
    draw(ctx) {
        for (let row = 0; row < this.mapMaze.length; row++) {
            for (let column = 0; column < this.mapMaze[row].length; column++) {
                const tile = this.mapMaze[row][column];
                if (tile === 1) {
                    this.drawWall(ctx, column, row, this.tileSize);
                }
                else if (tile === 0) {
                    this.drawDot(ctx, column, row, this.tileSize);
                }
            }
        }
    }
    drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, (column * this.tileSize) + this.game.canvas.width / 3, (row * this.tileSize) + 200, size, size);
    }
    drawDot(ctx, column, row, size) {
        ctx.drawImage(this.yellowDot, (column * this.tileSize) + this.game.canvas.width / 3, (row * this.tileSize) + 200, size, size);
    }
}
//# sourceMappingURL=TileMaps.js.map