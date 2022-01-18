import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import GameOverScreen from './GameOverScreen.js';
import WinningScreen from './WinningScreen.js';
export default class Level extends Scene {
    tileMaps;
    logo;
    gameOver;
    winGame;
    player;
    enemies;
    triggerTimer;
    triggerAgain;
    gameMap;
    constructor(game) {
        super(game);
        this.logo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.tileMaps = new TileMaps(game);
        this.player = this.tileMaps.getPlayer();
        this.triggerTimer = 0;
        this.triggerAgain = true;
        this.enemies = [];
        for (let index = 0; index < this.tileMaps.getEnemyCount(); index++) {
            this.enemies.push(this.tileMaps.getEnemies());
        }
    }
    processInput() {
        this.player.handleKeyInput();
        this.player.move();
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.logo, this.game.canvas.width * 0.41, this.game.canvas.height * 0.01, this.logo.width / 3, this.logo.height / 3);
        this.game.writeTextToCanvas(`Score: ${this.game.getUserData().getScore()}`, this.game.canvas.width * 0.75, this.game.canvas.height * 0.2, 40);
        this.tileMaps.draw(this.game.ctx);
        this.enemies.forEach((enemy) => {
            enemy.draw(this.game.ctx);
        });
        this.player.draw(this.game.ctx);
    }
    update() {
        this.checkForDamage();
        this.checkCollisionPassword();
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
        if (this.triggerAgain === true) {
            this.triggerAgain = false;
            this.game.getUserData().revealCount += 2;
            this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
        }
        else if (this.triggerAgain === false && this.triggerTimer >= 60) {
            this.triggerAgain = true;
            this.triggerTimer = 0;
        }
    }
    checkForNeed() {
        if (this.player.collideWithEnemy(this.enemies))
            return true;
        return this.enemies.find((enemy) => enemy.checkForEnemyDamage()) !== undefined;
    }
    checkGameOver() {
        if (this.game.getUserData().revealCount >= this.game.getUserData().getPassword().length) {
            return true;
        }
        return false;
    }
    checkGameWin() {
        if (this.game.getUserData().getScore() === 364) {
            return true;
        }
        return false;
    }
    checkCollisionPassword() {
        this.enemies = this.enemies.filter((enemy) => {
            if (enemy.checkForEnemyDamage()) {
                return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=Level.js.map