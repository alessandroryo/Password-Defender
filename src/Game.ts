import Player from './Player.js';
import ScoringObject from './ScoringObject.js';
import Scene from './Scene.js';
import GameLoop from './GameLoop.js';
import UserData from './UserData.js';

export default class Game {
  private gameLoop: GameLoop;

  private canvas: HTMLCanvasElement;

  private user: UserData;

  private ctx: CanvasRenderingContext2D;

  private player: Player;

  private scoringObject: ScoringObject[];

  /**
   * Constructs the Game from the beginning with the canvas
   * @param canvasId passes the Id of the index.html canvas from app.ts
   */
  constructor(canvasId: HTMLElement) {
    // Construct all of the canvas
    this.canvas = <HTMLCanvasElement>canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // Start the game cycle
    this.gameLoop = new GameLoop();

    this.scoringObject = [];

    console.log('Game.ts working');
  }

  /**
   * Method to load a new image
   *
   * @param imgSrc is the source of the image thats about to be loaded
   * @returns the newly loaded image
   */
  public static loadNewImage(imgSrc: string): HTMLImageElement {
    const img = new Image();
    img.src = imgSrc;
    return img;
  }

  /**
   * Method to return a random number between min and max values
   *
   * @param min lower boundary
   * @param max upper boundary
   * @returns a random number between the min and max numbers
   */
  public static randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (min - max) + min);
  }
}
