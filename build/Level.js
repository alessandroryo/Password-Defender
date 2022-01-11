import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
export default class Level extends Scene {
    tileMaps;
    logoSecond;
    player;
    enemies;
    enemyCount;
    constructor(game) {
        super(game);
        this.logoSecond = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.tileMaps = new TileMaps(game);
        this.player = this.tileMaps.getPlayer(2);
        this.enemies = [];
        this.enemyCount = 4;
        for (let index = 0; index < this.enemyCount; index++) {
            this.enemies.push(this.tileMaps.getEnemies(2));
        }
    }
    processInput() {
        this.player.handleKeyInput();
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.logoSecond, (this.game.canvas.width / 2) - 250, 10, this.logoSecond.width / 2, this.logoSecond.height / 2);
        this.tileMaps.draw(this.game.ctx);
        this.player.draw(this.game.ctx);
        this.enemies.forEach((enemy) => {
            enemy.draw(this.game.ctx);
        });
    }
    update(elapsed) {
        this.player.move();
        return null;
    }
}
//# sourceMappingURL=Level.js.map