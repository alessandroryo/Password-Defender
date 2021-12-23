import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import Player from './Player.js';

export default class Level extends Scene {
  private tileMaps: TileMaps;

  private logoSecond: HTMLImageElement;

  private player: Player;

  constructor(game: Game) {
    super(game);
    this.logoSecond = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.tileMaps = new TileMaps(game);
  }

  public processInput(): void { 
    return null;
  }

  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.ctx.drawImage(
      this.logoSecond,
      (this.game.canvas.width / 2) - 250, 10,
      this.logoSecond.width / 2,
      this.logoSecond.height / 2,
    );
    this.tileMaps.draw(this.game.ctx);
  }

  public update(elapsed: number): Scene {
    return null;
  }
}
