import Game from './Game.js';
import KeyListener from './KeyboardListener.js';

export default class PowerupPopup {
  protected img: HTMLImageElement;

  private backToGame: boolean;

  private keyListener: KeyListener;

  public allowedToMove: boolean;

  constructor(imageSrc: string) {
    this.img = Game.loadNewImage(imageSrc);
    this.keyListener = new KeyListener();
  }

  public displayPopup1(): void {
    this.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      this.allowedToMove = true;
    }
  }

  public displayPopup2(): void {
    this.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      this.allowedToMove = true;
    }
  }

  public displayPopup3(): void {
    this.allowedToMove = false;
    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      this.allowedToMove = true;
    }
  }
}
