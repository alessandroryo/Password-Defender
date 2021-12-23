import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserData from './UserData';

export default class UserInputScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private usernameInfo: HTMLImageElement;

  private username: string;

  private password: string;

  /**
   * @param game game
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.usernameInfo = Game.loadNewImage('./assets/img/Input-Username.png');
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      this.nextScene = true;
    }
  }

  /**
   *@returns null
   */
  public update(): Scene {
    // if (this.nextScene) {
    //   const loginForm = document.querySelector('#login');
    //   loginForm.classList.remove('form--hidden');
    //   loginForm.classList.add('form--unhidden');
    // }
    if (this.nextScene) {
      this.username = prompt("Please enter your name");
      return new PasswordInputScreen(this.game);
    }
    return null;
  }

 /**
   *
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 250,
      (this.game.canvas.height / 2) - 320,
    );
    this.game.ctx.drawImage(
      this.usernameInfo,
      (this.game.canvas.width / 2) - 250,
      600,
    );
  }
}
