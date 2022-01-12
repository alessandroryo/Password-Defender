import GameMap from './GameMap.js';
import TileMaps from './TileMaps.js';
import Game from './Game.js';
import MovingDirection from './MovingDirection.js';

export default class EnemyVirus {
  private x: number;

  private y: number;

  private tileSize: number;

  private velocity: number;

  private gameMap: GameMap;

  private tileMap: TileMaps;

  private movingDirection: number;

  private directionTimerDefault: number;

  private directionTimer: number;

  constructor(
    x: number,
    y: number,
    tileSize: number,
    velocity: number,
    gameMap: GameMap,
    tileMap: TileMaps,
  ) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.gameMap = gameMap;
    this.tileMap = tileMap;

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length,
    );

    // this.directionTimerDefault = Game.randomNumber(10, 20);
    this.directionTimerDefault = 10;
    this.directionTimer = this.directionTimerDefault;
  }

  public draw(ctx: CanvasRenderingContext2D) : void {
    this.move();
    this.changeDirection();
    ctx.drawImage(
      Game.loadNewImage('./assets/img/Microbug.png'),
      this.x + 300,
      this.y + 200,
      this.tileSize,
      this.tileSize,
    );
  }

  public changeDirection() : void {
    this.directionTimer -= 2;
    let newMoveDirection = null;
    if (this.directionTimer === 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length,
      );
    }

    if (newMoveDirection != null && this.movingDirection !== newMoveDirection) {
      if (
        Number.isInteger(this.x / this.tileSize)
        && Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.collideWithEnvironment(
            this.x,
            this.y,
            newMoveDirection,
          )
        ) {
          this.movingDirection = newMoveDirection;
        }
      }
    }
  }

  private move() {
    if (
      !this.tileMap.collideWithEnvironment(
        this.x,
        this.y,
        this.movingDirection,
      )
    ) {
      switch (this.movingDirection) {
        case MovingDirection.getMDUp():
          this.y -= this.velocity;
          break;
        case MovingDirection.getMDDown():
          this.y += this.velocity;
          break;
        case MovingDirection.getMDLeft():
          this.x -= this.velocity;
          break;
        case MovingDirection.getMDRight():
          this.x += this.velocity;
          break;
        default:
          break;
      }
    }
  }

  public getXPos() : number {
    return this.x;
  }

  /**
   *
   * @returns enemy y-position
   */
  public getYPos() : number {
    return this.y;
  }
}
