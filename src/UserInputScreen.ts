import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';

export default class UserInputScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private username: string;

  private password: string;

  /**
   * @param game game
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.shouldStart = false;
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      this.userEntered = true;
    }
  }

  /**
   *
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // eslint-disable-next-line max-len
    this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
    // eslint-disable-next-line max-len
    this.game.writeTextToCanvas('Input your Name here!', this.game.canvas.width / 2, 740, 40);
  }

  /**
   *@returns null
   */
  public update(): Scene {
    if (this.firstEnter) {
      const loginForm = document.querySelector('#login');
      loginForm.classList.remove('form--hidden');
      loginForm.classList.add('form--unhidden');
    }
    if (this.userEntered) {
      return new PasswordInputScreen(this.game);
    }
    return null;
  }
}