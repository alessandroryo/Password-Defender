import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Level from './Level.js';
import Scene from './Scene.js';
export default class PasswordInputScreen extends Scene {
    mainLogo;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.nextScene = true;
        }
    }
    update() {
        if (this.nextScene) {
            return new Level(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.writeTextToCanvas('Input your Password here!', this.game.canvas.width / 2, 630, 40);
    }
}
//# sourceMappingURL=PasswordInputScreen.js.map