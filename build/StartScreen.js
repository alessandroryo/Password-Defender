import Game from './Game.js';
import IntroScreen from './IntroScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import ShopScreen from './ShopScreen.js';
export default class StartScreen extends Scene {
    mainLogo;
    buttonImage;
    constructor(game) {
        super(game);
        game.resetUserData();
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
        this.buttonImage = Game.loadNewImage('./assets/img/Press-S-Start.png');
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_S) || this.keyBoard.isKeyDown(KeyListener.KEY_P)) {
            this.nextScene = true;
        }
    }
    update() {
        if (!this.nextScene)
            return null;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
            return new IntroScreen(this.game);
        }
        if (this.keyBoard.isKeyDown(KeyListener.KEY_P)) {
            return new ShopScreen(this.game);
        }
        return null;
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - 250, this.game.canvas.height - this.game.canvas.height * 0.3);
    }
}
//# sourceMappingURL=StartScreen.js.map