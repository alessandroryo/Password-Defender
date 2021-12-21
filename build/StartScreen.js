import Game from './Game.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';
export default class StartScreen extends Scene {
    mainLogo;
    keyBoard;
    button;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.button = Game.loadNewImage('./assets/img/Start-Button.png');
        this.keyBoard = new KeyListener();
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
            this.shouldStart = true;
        }
    }
    update() {
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.ctx.drawImage(this.button, (this.game.canvas.width / 2) - 100, (this.game.canvas.height / 2) + 200);
    }
}
//# sourceMappingURL=StartScreen.js.map