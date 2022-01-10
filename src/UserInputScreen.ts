import Game from './Game.js';
import PasswordInputScreen from './PasswordInputScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserData from './UserData.js';

export default class UserInputScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private usernameInfo: HTMLImageElement;

  private username: string;

  private password: string;

  private user: UserData;


  /**
   * @param game game
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.usernameInfo = Game.loadNewImage('./assets/img/Input-Username.png');
    this.user = new UserData;
  }

  public myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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
    if (this.nextScene) {
      this.user.setUsername(prompt("Please enter your name"));

      // var Login = document.getElementById("login");
      // Login.classList.remove('form--hidden');
      // Login.classList.add('form--unhidden');

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
      650,
    );

  }
}
