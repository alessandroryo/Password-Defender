import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
export default class PowerupPopup {
    img;
    backToGame;
    keyListener;
    static allowedToMove;
    constructor(imageSrc) {
        this.img = Game.loadNewImage(imageSrc);
        this.keyListener = new KeyListener();
        PowerupPopup.allowedToMove = true;
    }
    displayPopup1() {
        PowerupPopup.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
    displayPopup2() {
        PowerupPopup.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
    displayPopup3() {
        PowerupPopup.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            PowerupPopup.allowedToMove = true;
        }
    }
}
//# sourceMappingURL=PowerupPopup.js.map