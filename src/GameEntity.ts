import Game from './Game.js';

export default abstract class GameEntity {
  protected img: HTMLImageElement;

  protected xPos: number;

  protected yPos: number;

  constructor(imageSrc: string, maxX: number, maxY: number) {
    this.img = Game.loadNewImage(imageSrc);
    this.xPos = Game.randomNumber(0, maxX);
    this.yPos = Game.randomNumber(0, maxY);
  }

  public getImageHeight() : number {
    return this.img.height;
  }

  public getImageWidth() : number {
    return this.img.width;
  }

  public getXPos() : number {
    return this.xPos;
  }

  public getYPos() : number {
    return this.yPos;
  }

  public draw(ctx: CanvasRenderingContext2D) : void {
    ctx.drawImage(this.img, this.xPos, this.yPos);
  }
}