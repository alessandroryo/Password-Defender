import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
export default class UserInputScreen extends Scene {
    mainLogo;
    usernameInfo;
    glassplane;
    glassplane2;
    wrongAlert;
    inputUser;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.usernameInfo = Game.loadNewImage('./assets/img/Input-Username.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.inputUser = document.getElementById('input').value;
            this.game.getUserData().setUsername(this.inputUser);
            this.nextScene = true;
        }
    }
    update() {
        if (this.nextScene) {
            this.glassplane = document.getElementById('glasspane');
            this.glassplane.style.display = 'none';
            this.glassplane.style.position = 'absolute';
            this.glassplane2 = document.getElementById('glasspane2');
            this.glassplane2.style.display = 'block';
            this.glassplane2.style.position = 'absolute';
            this.wrongAlert = document.getElementById('alert');
            this.wrongAlert.style.display = 'block';
            this.wrongAlert.style.position = 'absolute';
            return new PasswordInputScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.ctx.drawImage(this.usernameInfo, (this.game.canvas.width / 2) - 250, this.game.canvas.height * 0.7);
    }
}
//# sourceMappingURL=UserInputScreen.js.map