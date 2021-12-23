import Game from './Game.js';
import GameMap from './GameMap.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';
import UserInputScreen from './UserInputScreen.js';

export default class IntroScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private instruction: HTMLImageElement;

  /**
   * @param game
   */
  public constructor(game :Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
    this.instruction = Game.loadNewImage('./assets/img/Instruction.png');
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      this.nextScene = true;
    }
  }
    
  public update(): Scene {
    if (this.nextScene) {
      return new UserInputScreen(this.game);
    }
    return null;
  }

  /**
   *
   */
  public render():void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 110,
      0,
      this.mainLogo.width / 4.5,
      this.mainLogo.height / 4.5,
    );
    this.game.ctx.drawImage(
      this.instruction,
      (this.game.canvas.width / 2) - 400,
      100,
      this.instruction.width / 2,
      this.instruction.height / 2,
    );
    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - 300,
      600,
    );
  }
}
