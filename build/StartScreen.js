import Game from './Game.js';
import IntroScreen from './Intro.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
export default class StartScreen extends Scene {
    mainLogo;
    button;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.button = Game.loadNewImage('./assets/img/Start-Button.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
            this.shouldStart = true;
        }
    }
    update() {
        if (this.shouldStart) {
            return new IntroScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.writeTextToCanvas('Press "S" to start', this.game.canvas.width / 2, 630, 40);
    }
}
//# sourceMappingURL=StartScreen.js.map