import Game from './Game.js';
import IntroScreen from './IntroScreen.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';

export default class StartScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private button: HTMLImageElement;

  /**
   * @param game
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.button = Game.loadNewImage('./assets/img/Start-Button.png');
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
      this.shouldStart = true;
    }
  }

  public update(): Scene {
    if (this.shouldStart) {
      return new IntroScreen(this.game);
    }
    return null;
  }

  /**
   *
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(this.mainLogo,
      (this.game.canvas.width / 2) - 250,
      (this.game.canvas.height / 2) - 320);
    this.game.ctx.drawImage(
      this.button,
      (this.game.canvas.width / 2) - 100,
      580,
    );
    this.game.writeTextToCanvas(
      'Press "S" to start',
      this.game.canvas.width / 2,
      630,
      40,
    );
  }
}
