import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import StartScreen from './StartScreen.js';
export default class WinScreen extends Scene {
    mainLogo;
    buttonImage;
    winTitle;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.buttonImage = Game.loadNewImage('./assets/img/Press-R-Restart.png');
        this.winTitle = Game.loadNewImage('./assets/img/You-Win.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_R)) {
            this.nextScene = true;
        }
    }
    update() {
        if (this.nextScene) {
            return new StartScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 110, 0, this.mainLogo.width / 4.5, this.mainLogo.height / 4.5);
        this.game.ctx.drawImage(this.winTitle, (this.game.canvas.width / 2) - 200, 250, this.winTitle.width / 2, this.winTitle.height / 2);
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - 250, 600);
    }
}
//# sourceMappingURL=WinningScreen.js.map