import Game from './Game.js';
import IntroScreen from './IntroScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';

export default class StartScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  /**
   * @param game Game Class
   */
  constructor(game: Game) {
    super(game);
    game.resetUserData();
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-S-Start.png');
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
      this.nextScene = true;
    }
  }

  /**
   *
   * @returns New scene
   */
  public update(): Scene {
    if (this.nextScene) {
      return new IntroScreen(this.game);
    }
    return null;
  }

  /**
   * Render to canvas
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(this.mainLogo,
      (this.game.canvas.width / 2) - 250,
      (this.game.canvas.height / 2) - 320);
    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - 250,
      650,
    );
  }
}
