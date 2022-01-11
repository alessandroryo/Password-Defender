import Scene from './Scene.js';
import GameLoop from './GameLoop.js';
import UserData from './UserData.js';
import TileMaps from './TileMaps.js';
import StartScreen from './StartScreen.js';

export default class Game {
  public canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  private gameLoop: GameLoop;

  private scene: Scene;

  public user: UserData;

  private tileMaps: TileMaps;

  private velocity: number;

  /**
   * Constructs the Game from the beginning with the canvas
   *
   * @param canvas passes the Id of the index.html canvas from app.ts
   */
  constructor(canvas: HTMLCanvasElement) {
    // Construct all of the canvas
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Start the game cycle
    this.gameLoop = new GameLoop();

    this.scene = new StartScreen(this);
    this.gameLoop.start(this.scene);
    this.user = new UserData();

    this.tileMaps = new TileMaps(this);
  }

  /**
   * Writes text to the canvas
   *
   * @param text - Text to write
   * @param xCoordinate - Horizontal coordinate in pixels
   * @param yCoordinate - Vertical coordinate in pixels
   * @param fontSize - Font size in pixels
   * @param color - The color of the text
   * @param alignment - Where to align the text
   */
  public writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize: number = 20,
    color: string = 'white',
    alignment: CanvasTextAlign = 'center',
  ): void {
    const ctx = this.canvas.getContext('2d');
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = alignment;
    ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Method to load an image
   *
   * @param source the source
   * @returns HTMLImageElement - returns an image
   */
  public static loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
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
