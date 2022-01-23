import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import TileMaps from './TileMaps.js';
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
        this.displayImage1 = Game.loadNewImage('./assets/img/Fire-Wall-PopUp.png');
        this.displayImage2 = Game.loadNewImage('./assets/img/VPN-PopUp.png');
        this.displayImage3 = Game.loadNewImage('./assets/img/Anti-Virus-PopUp.png');
        PowerupPopup.allowedToMove = true;
    }
    displayPopup1(game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage1, (game.canvas.width / 2) - (this.displayImage1.width / 2), game.canvas.height * 0.3);
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
            TileMaps.powerUpOneActive = false;
        }
    }
    displayPopup2(game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage2, (game.canvas.width / 2) - (this.displayImage2.width / 2), game.canvas.height * 0.3);
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
            TileMaps.powerUpTwoActive = false;
        }
    }
    displayPopup3(game) {
        PowerupPopup.allowedToMove = false;
        game.ctx.drawImage(this.displayImage3, (game.canvas.width / 2) - (this.displayImage3.width / 2), game.canvas.height * 0.3);
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
            TileMaps.powerUpThreeActive = false;
        }
    }
}
//# sourceMappingURL=PowerupPopup.js.map