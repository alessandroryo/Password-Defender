import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
export default class PowerupPopup {
    img;
    backToGame;
    keyListener;
    allowedToMove;
    constructor(imageSrc) {
        this.img = Game.loadNewImage(imageSrc);
        this.keyListener = new KeyListener();
    }
    displayPopup1() {
        this.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            this.allowedToMove = true;
        }
    }
    displayPopup2() {
        this.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            this.allowedToMove = true;
        }
    }
    displayPopup3() {
        this.allowedToMove = false;
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
            this.backToGame = true;
            this.allowedToMove = true;
        }
    }
}
//# sourceMappingURL=PowerupPopup.js.map