import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import TileMaps from './TileMaps.js';

export default class PowerupPopup {
  protected img: HTMLImageElement;

  private backToGame: boolean;

  private keyListener: KeyListener;

  public static allowedToMove: boolean;

  public static powerUpAfterDisplay: number;

  private displayImage1: HTMLImageElement;

  private displayImage2: HTMLImageElement;

  private displayImage3: HTMLImageElement;

  private game: Game;

  /**
   * Construct images for display class
   *
   */
  constructor() {
    this.keyListener = new KeyListener();
    this.displayImage1 = Game.loadNewImage('./assets/img/Fire-Wall-PopUp.png');
    this.displayImage2 = Game.loadNewImage('./assets/img/VPN-PopUp.png');
    this.displayImage3 = Game.loadNewImage('./assets/img/Anti-Virus-PopUp.png');
    PowerupPopup.allowedToMove = true;
    PowerupPopup.powerUpAfterDisplay = 0;
  }

  /**
   * displays firewall messages, checks for enter key to activate walls
   *
   * @param game Game class
   */
  public displayPopup1(game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage1,
      (game.canvas.width / 2) - (this.displayImage1.width / 2),
      game.canvas.height * 0.3,
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
      TileMaps.powerUpOneActive = false;
    }
  }

  /**
   * displays Vpn messages, checks for enter key to activate Vpn
   *
   * @param game Game class
   */
  public displayPopup2(game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage2,
      (game.canvas.width / 2) - (this.displayImage2.width / 2),
      game.canvas.height * 0.3,
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
      TileMaps.powerUpTwoActive = false;
      PowerupPopup.powerUpAfterDisplay = 2;
    }
  }

  /**
   * displays Antivirus messages, checks for enter key to activate Antivirus
   *
   * @param game Game class
   */
  public displayPopup3(game: Game): void {
    PowerupPopup.allowedToMove = false;
    game.ctx.drawImage(
      this.displayImage3,
      (game.canvas.width / 2) - (this.displayImage3.width / 2),
      game.canvas.height * 0.3,
    );

    if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)) {
      this.backToGame = true;
      PowerupPopup.allowedToMove = true;
      TileMaps.powerUpThreeActive = false;
      PowerupPopup.powerUpAfterDisplay = 3;
    }
  }
}
