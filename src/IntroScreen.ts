import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserInputScreen from './UserInputScreen.js';

export default class IntroScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private instruction: HTMLImageElement;

  private glassplane:HTMLElement;

  /**
   * Construct the introduction screen class
   *
   * @param game Game class
   */
  public constructor(game :Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
    this.instruction = Game.loadNewImage('./assets/img/Instruction.png');
  }

  /**
   * Method for read the process input from user
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      this.glassplane = document.getElementById('glasspane');
      this.glassplane.style.display = 'inline';
      this.glassplane.style.position = 'absolute';
      this.nextScene = true;
    }
  }

  /**
   * Method for update the screen
   *
   * @returns New scene
   */
  public update(): Scene {
    if (this.nextScene) {
      return new UserInputScreen(this.game);
    }
    return null;
  }

  /**
   * Render to canvas
   */
  public render():void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 110,
      this.game.canvas.height * 0.1,
      this.mainLogo.width / 4.5,
      this.mainLogo.height / 4.5,
    );

    this.game.ctx.drawImage(
      this.instruction,
      (this.game.canvas.width / 2) - 400,
      this.game.canvas.height * 0.2,
      this.instruction.width / 2,
      this.instruction.height / 2,
    );

    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - 300,
      this.game.canvas.height * 0.7,
    );
  }
}
