import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
export default class UserInputScreen extends Scene {
    mainLogo;
    username;
    password;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.shouldStart = false;
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.userEntered = true;
        }
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.writeTextToCanvas('Input your Name here!', this.game.canvas.width / 2, 740, 40);
    }
    update() {
        if (this.firstEnter) {
            const loginForm = document.querySelector('#login');
            loginForm.classList.remove('form--hidden');
            loginForm.classList.add('form--unhidden');
        }
        if (this.userEntered) {
            return new PasswordInputScreen(this.game);
        }
        return null;
    }
}
//# sourceMappingURL=UserInputScreen.js.map