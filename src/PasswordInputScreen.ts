import Game from './Game.js';
import KeyListener from './KeyboardListener.js';
import Scene from './Scene.js';

export default class PasswordInputScreen extends Scene {
    private mainLogo: HTMLImageElement;
    /**
     * @param game
     */

    public constructor(game: Game) {
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
        return null;
    }

  /**
   *
   */ public render(): void {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        // eslint-disable-next-line max-len
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 250, (this.game.canvas.height / 2) - 320);
        // eslint-disable-next-line max-len
        this.game.writeTextToCanvas('Input your Password here!', this.game.canvas.width / 2, 630, 40);
    }
}
