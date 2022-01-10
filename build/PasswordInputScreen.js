import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Level from './Level.js';
import UserData from './UserData.js';
import Scene from './Scene.js';
export default class PasswordInputScreen extends Scene {
    mainLogo;
    passwordInfo;
    user;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.passwordInfo = Game.loadNewImage('./assets/img/Input-Password.png');
        this.user = new UserData();
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.nextScene = true;
        }
    }
    update() {
        if (this.nextScene) {
            this.user.setPassword(prompt('Please enter your name'));
            return new Level(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.ctx.drawImage(this.passwordInfo, (this.game.canvas.width / 2) - 250, 650);
    }
}
//# sourceMappingURL=PasswordInputScreen.js.map