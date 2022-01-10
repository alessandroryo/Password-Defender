export default class MovingDirection {
  private up: number;

  private down: number;

  private left: number;

  private right: number;

  constructor() {
    this.up = 0;
    this.down = 1;
    this.left = 2;
    this.right = 3;
  }

  public getMDUp() : number {
    return this.up;
  }

  public getMDDown() : number {
    return this.down;
  }

  public getMDLeft() : number {
    return this.left;
  }

  public getMDRight() : number {
    return this.right;
  }
}
