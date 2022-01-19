import Game from './Game.js';
import KeyListener from './KeyboardListener.js';

export default class PowerupPopup {
  protected img: HTMLImageElement;

  private backToGame: boolean;

  private keyListener: KeyListener;

  public static allowedToMove: boolean;

  constructor(imageSrc: string) {
    this.img = Game.loadNewImage(imageSrc);
    this.keyListener = new KeyListener();
    PowerupPopup.allowedToMove = true;
  }

  public displayPopup1(): void {
    PowerupPopup.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }

  public displayPopup2(): void {
    PowerupPopup.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }

  public displayPopup3(): void {
    PowerupPopup.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }
}
