import Game from './Game.js';

export default abstract class Scene {
  protected readonly game: Game;

  protected canvas: HTMLCanvasElement;

  protected shouldStart: boolean;

  constructor(game: Game) {
    this.game = game;
    this.shouldStart = false;
  }

  public abstract processInput() : void;

  public abstract update(elapsed: number) : Scene;

  public abstract render() : void;
}
