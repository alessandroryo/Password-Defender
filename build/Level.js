import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import GameOverScreen from './GameOverScreen.js';
import WinningScreen from './WinningScreen.js';
export default class Level extends Scene {
    tileMaps;
    logo;
    enemyCount;
    gameOver;
    winGame;
    player;
    enemies;
    triggerTimer;
    triggerAgain;
    constructor(game) {
        super(game);
        this.logo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.tileMaps = new TileMaps(game);
        this.player = this.tileMaps.getPlayer(2);
        this.triggerTimer = 0;
        this.triggerAgain = true;
        this.enemies = [];
        this.enemyCount = 4;
        for (let index = 0; index < this.enemyCount; index++) {
            this.enemies.push(this.tileMaps.getEnemies(1));
        }
    }
    processInput() {
        this.player.handleKeyInput();
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.logo, (this.game.canvas.width / 2) - 250, 10, this.logo.width / 2, this.logo.height / 2);
        this.game.writeTextToCanvas(`Score: ${this.game.getUserData().getScore()}`, (this.game.canvas.width / 2) + 450, 200, 40);
        this.tileMaps.draw(this.game.ctx);
        this.enemies.forEach((enemy) => {
            enemy.draw(this.game.ctx);
        });
        this.player.draw(this.game.ctx);
    }
    update() {
        this.player.move();
        this.checkForDamage();
        if (this.checkGameOver()) {
            return new GameOverScreen(this.game);
        }
        if (this.checkGameWin()) {
            return new WinningScreen(this.game);
        }
        return null;
    }
    checkForDamage() {
        this.triggerTimer += 1;
        if (!this.checkForNeed())
            return;
        this.triggerTimer += 1;
        console.log(this.triggerTimer, this.triggerAgain);
        if (this.triggerAgain === true) {
            this.game.getUserData().revealCount += 2;
            this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
            this.triggerAgain = false;
        }
        else if (this.triggerAgain === false && this.triggerTimer >= 60) {
            this.triggerAgain = true;
            this.triggerTimer = 0;
        }
    }
    checkForNeed() {
        if (this.player.collideWithEnemy(this.enemies))
            return true;
        return this.enemies.find((enemy) => enemy.checkForDamage()) !== undefined;
    }
    checkGameOver() {
        if (this.game.getUserData().revealCount >= this.game.getUserData().getPassword().length) {
            return true;
        }
        return false;
    }
    checkGameWin() {
        if (this.game.getUserData().getScore() === 375) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=Level.js.map