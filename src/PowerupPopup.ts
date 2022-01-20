import Game from './Game.js';
import KeyListener from './KeyboardListener.js';

export default class PowerupPopup {
  protected img: HTMLImageElement;

  private backToGame: boolean;

  private keyListener: KeyListener;

  public static allowedToMove: boolean;

  private displayImage1: HTMLImageElement;

  private displayImage2: HTMLImageElement;

  private displayImage3: HTMLImageElement;

  private game: Game;

  constructor() {
    this.keyListener = new KeyListener();
    this.displayImage1 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
    this.displayImage2 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
    this.displayImage3 = Game.loadNewImage('./assets/img/not-enough-cookies.png');
    PowerupPopup.allowedToMove = true;
  }

  public displayPopup1(ctx: CanvasRenderingContext2D, game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage1,
      (game.canvas.width / 2) - (this.displayImage1.width / 2),
      game.canvas.height * (15 / 100),
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }

  public displayPopup2(ctx: CanvasRenderingContext2D, game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage2,
      (game.canvas.width / 2) - (this.displayImage2.width / 2),
      game.canvas.height * (15 / 100),
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }

  public displayPopup3(ctx: CanvasRenderingContext2D, game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage3,
      (game.canvas.width / 2) - (this.displayImage3.width / 2),
      game.canvas.height * (15 / 100),
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
    }
  }
}
