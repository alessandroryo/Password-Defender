import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserInputScreen from './UserInputScreen.js';

export default class IntroScreen extends Scene {
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
      this.instruction,
      (this.game.canvas.width / 2) - 400,
      0,
      this.instruction.width * 0.93,
      this.instruction.height * 0.93,
    );

    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - 300,
      850,
    );
  }
}
