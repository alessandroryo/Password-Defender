export default class MovingDirection {
  private static up: number;

  private static down: number;

  private static left: number;

  private static right: number;

  /**
   * Construct moving direction class
   */
  constructor() {
    MovingDirection.up = 0;
    MovingDirection.down = 1;
    MovingDirection.left = 2;
    MovingDirection.right = 3;
  }

  /**
   * Getter for moving direction up
   *
   * @returns Moving direction up
   */
  public static getMDUp() : number {
    return this.up;
  }

  /**
   * Getter for moving direction down
   *
   * @returns Moving direction down
   */
  public static getMDDown() : number {
    return this.down;
  }

  /**
   * Getter for moving direction left
   *
   * @returns Moving direction left
   */
  public static getMDLeft() : number {
    return this.left;
  }

  /**
   * Getter for moving direction right
   *
   * @returns Moving direction right
   */
  public static getMDRight() : number {
    return this.right;
  }
}
