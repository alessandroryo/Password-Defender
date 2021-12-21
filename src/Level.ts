import Scene from './Scene.js';
import Player from './Player.js';
import Game from './Game.js';

export default class Level extends Scene {
  private player: Player;

  private countUntilNextItem: number;

  constructor(game: Game) {
    super(game);
    this.player = new Player(this.game.canvas.width, this.game.canvas.height);
    this.countUntilNextItem = 360;
  }
  
  public processInput(): void {
    return null;
  }

  public render(): void {
    return null;
  }

  public update(elapsed: number): Scene {
    return null;
  }
}
