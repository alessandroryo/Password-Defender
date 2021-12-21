import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
export default class IntroScreen extends Scene {
    constructor(game) {
        super(game);
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.shouldStart = true;
        }
    }
    update() {
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.writeTextToCanvas('Instructions', this.game.canvas.width / 2, 100, 50);
        this.game.writeTextToCanvas('Press "Enter" to continue', this.game.canvas.width / 2, 600);
    }
}
//# sourceMappingURL=Intro.js.map