import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Level from './Level.js';
import UserData from './UserData.js';
import Scene from './Scene.js';
export default class PasswordInputScreen extends Scene {
    mainLogo;
    passwordInfo;
    user;
    glassplane2;
    inputUserPassword;
    specialChars;
    constructor(game, specialChars) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.passwordInfo = Game.loadNewImage('./assets/img/Input-Password.png');
        this.user = new UserData();
    }
    containsSpecialChars() {
        this.specialChars = /[`!@#$%^&*()_+\-=[{};':"|,.<>?~]/;
        return this.specialChars.test(this.inputUserPassword);
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.inputUserPassword = document.getElementById('input2').value;
            if (this.inputUserPassword.length > 7 && this.inputUserPassword.length < 13) {
                for (let i = 0; i < this.inputUserPassword.length; i++) {
                    if (this.inputUserPassword[i] === this.inputUserPassword[i].toUpperCase()
                        && this.containsSpecialChars() === true) {
                        this.user.setPassword(this.inputUserPassword);
                        this.nextScene = true;
                    }
                    else {
                        console.log('wrong password');
                    }
                }
            }
        }
    }
    update() {
        if (this.nextScene) {
            this.glassplane2 = document.getElementById('glasspane2');
            this.glassplane2.style.display = 'none';
            this.glassplane2.style.position = 'hide';
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