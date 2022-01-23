import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Level from './Level.js';
import Scene from './Scene.js';
export default class PasswordInputScreen extends Scene {
    mainLogo;
    passwordInfo;
    wrongAlert;
    glassplane2;
    inputUserPassword;
    specialChars;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.passwordInfo = Game.loadNewImage('./assets/img/Input-Password.png');
    }
    containsSpecialChars() {
        this.specialChars = /[`!@#$%^&*()_+\-=[{};':"|,.<>?~]/;
        return this.specialChars.test(this.inputUserPassword);
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            this.inputUserPassword = document.getElementById('input2').value;
            if (this.inputUserPassword.length > 7 && this.inputUserPassword.length < 16) {
                for (let i = 0; i < this.inputUserPassword.length; i++) {
                    if (this.inputUserPassword[i] === this.inputUserPassword[i].toUpperCase()
                        && this.containsSpecialChars() === true) {
                        this.game.getUserData().setPassword(this.inputUserPassword);
                        this.nextScene = true;
                        return;
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
            this.wrongAlert = document.getElementById('alert');
            this.wrongAlert.style.display = 'none';
            this.wrongAlert.style.position = 'hide';
            return new Level(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - ((this.mainLogo.width * 0.8) / 2), 0, this.mainLogo.width * 0.8, this.mainLogo.height * 0.8);
        this.game.ctx.drawImage(this.passwordInfo, (this.game.canvas.width / 2) - (this.passwordInfo.width / 2), this.game.canvas.height * 0.7);
        this.game.writeTextToCanvas('1. Do not use the same password, security question and answer for multiple important accounts.', (this.game.canvas.width / 2), (this.game.canvas.height / 2) + 20, 25, 'red');
        this.game.writeTextToCanvas('2. Use a password that has at least 16 characters, use at least one number, one uppercase letter, one lowercase letter and one special symbol.', (this.game.canvas.width / 2), (this.game.canvas.height / 2) + 20 + 25, 25, 'red');
        this.game.writeTextToCanvas('3. Do not use the names of your families, friends or pets in your passwords.', (this.game.canvas.width / 2), (this.game.canvas.height / 2) + 20 + 50, 25, 'red');
        this.game.writeTextToCanvas('4. Do not use postcodes, house numbers, phone numbers, birthdates, ID card numbers, social security numbers, and so on in your passwords.', (this.game.canvas.width / 2), (this.game.canvas.height / 2) + 20 + 75, 25, 'red');
        this.game.writeTextToCanvas('5. Do not use any dictionary word in your passwords.', (this.game.canvas.width / 2), (this.game.canvas.height / 2) + 20 + 100, 25, 'red');
    }
}
//# sourceMappingURL=PasswordInputScreen.js.map