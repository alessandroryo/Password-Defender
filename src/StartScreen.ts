import Game from './Game.js';
import KeyListener from './KeyListener.js';
import Scene from './Scene.js';

export default class StartScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private keyBoard: KeyListener;

  /**
   * @param game
   */
  constructor(game: Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Main).png');
    this.keyBoard = new KeyListener();
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_S)) {
      this.shouldStart = true;
    }
  }

  /**
   * @param elapsed
   */
  public update(): Scene {
    return null;
  }

  /**
   *
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    // eslint-disable-next-line max-len
    this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 245, (this.game.canvas.height / 7), this.mainLogo.width / 1.8, this.mainLogo.height / 1.8);
    this.game.writeTextToCanvas('Press "S" to start', this.game.canvas.width / 2, this.game.canvas.height / 2);
  }
}
