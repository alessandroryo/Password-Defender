import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
export default class PowerupPopup {
    img;
    backToGame;
    keyListener;
    static allowedToMove;
    displayImage1;
    displayImage2;
    displayImage3;
    game;
    constructor() {
        this.keyListener = new KeyListener();
        this.displayImage1 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
        this.displayImage2 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
        this.displayImage3 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
        PowerupPopup.allowedToMove = true;
    }
    displayPopup1(ctx, game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage1, (game.canvas.width / 2) - (this.displayImage1.width / 2), game.canvas.height * (15 / 100));
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
    displayPopup2(ctx, game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage2, (game.canvas.width / 2) - (this.displayImage2.width / 2), game.canvas.height * (15 / 100));
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
    displayPopup3(ctx, game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage3, (game.canvas.width / 2) - (this.displayImage3.width / 2), game.canvas.height * (15 / 100));
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
}
//# sourceMappingURL=PowerupPopup.js.map