import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';

export default class UserInputScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private username: string;

  private password: string;

  /**
   *
   */
  public processInput(): void {

    if (this.unHideLogin = true) {
      e.preventDefault();
      form.classList.remove("form--hidden");
    }
  }

  /**
    * @param game
    */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
  }

  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // eslint-disable-next-line max-len
    this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
    // eslint-disable-next-line max-len
    this.game.writeTextToCanvas('Input your Name here!', this.game.canvas.width / 2, 740, 40);
  }
  /**
    *
    */
  public update(): Scene {
    if (this.userEntered) {
      return new PasswordInputScreen(this.game);
    }
    return null;
  }

}
