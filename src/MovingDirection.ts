export default class MovingDirection {
  private static up: number;

  private static down: number;

  private static left: number;

  private static right: number;

  constructor() {
    MovingDirection.up = 0;
    MovingDirection.down = 1;
    MovingDirection.left = 2;
    MovingDirection.right = 3;
  }

  public static getMDUp() : number {
    return this.up;
  }

  public static getMDDown() : number {
    return this.down;
  }

  public static getMDLeft() : number {
    return this.left;
  }

  public static getMDRight() : number {
    return this.right;
  }

  // eslint-disable-next-line class-methods-use-this
  public getRandomMove() : number {
    return Math.floor(Math.random() * Object.keys(MovingDirection).length);
  }
}
