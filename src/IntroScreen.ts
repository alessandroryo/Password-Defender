import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserInputScreen from './UserInputScreen.js';

export default class IntroScreen extends Scene {
  /**
   * @param game
   */
  public constructor(game :Game) {
    super(game);
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      this.shouldStart = true;
    }
  }

  public update(): Scene {

    document.querySelector("#form").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.remove("form--hidden");
      createAccountForm.classList.add("form--hidden");
  });
    if (this.shouldStart) {
      return new UserInputScreen(this.game);
    }
    return null;
  }

  /**
   *
   */
  public render():void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.writeTextToCanvas('Instructions', this.game.canvas.width / 2, 100, 50);
    this.game.writeTextToCanvas('Press "Enter" to continue', this.game.canvas.width / 2, 600);
  }
}
