import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import StartScreen from './StartScreen.js';
export default class GameOver extends Scene {
    mainLogo;
    buttonImage;
    gameOverTitle;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.buttonImage = Game.loadNewImage('./assets/img/Press-R-Restart.png');
        this.gameOverTitle = Game.loadNewImage('./assets/img/GameOver.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_R)) {
            this.nextScene = true;
        }
    }
    update(elapsed) {
        if (this.nextScene) {
            return new StartScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 110, 0, this.mainLogo.width / 4.5, this.mainLogo.height / 4.5);
        this.game.ctx.drawImage(this.gameOverTitle, (this.game.canvas.width / 2) - 175, 250, this.gameOverTitle.width / 2, this.gameOverTitle.height / 2);
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - 250, 600);
    }
}
//# sourceMappingURL=GameOver.js.map