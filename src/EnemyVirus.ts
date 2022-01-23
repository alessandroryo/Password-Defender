import TileMaps from './TileMaps.js';
import Game from './Game.js';
import MovingDirection from './MovingDirection.js';
import GameEntity from './GameEntity.js';
import GameMap from './GameMap.js';
import Player from './Player.js';
import PowerupPopup from './PowerupPopup.js';

export default class EnemyVirus extends GameEntity {
  private directionTimer: number;

  private directionTimerDefault: number;

  private movingDirection: number;

  /**
   * Constructor for enemy virus
   *
   * @param x Enemy x position
   * @param y Enemy y position
   * @param tileSize Enemy tile size
   * @param tileMaps Tile map
   * @param gameMap Game map
   */
  constructor(
    x: number,
    y: number,
    tileSize: number,
    tileMaps: TileMaps,
    gameMap: GameMap,
  ) {
    super(
      x,
      y,
      tileSize,
      tileMaps,
      gameMap,
    );

    this.velocity = 2;

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length,
    );

    this.directionTimerDefault = 20;
    this.directionTimer = this.directionTimerDefault;
    PowerupPopup.allowedToMove = true;
  }

  private move() {
    if (
      !this.tileMaps.collideWithEnvironment(
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

  private changeDirection(): void {
    if (PowerupPopup.allowedToMove === true) {
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
            !this.tileMaps.collideWithEnvironment(
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
  }

  /**
   *  Method for draw enemy virus to canvas
   *
   * @param ctx Canvas Rendering Context 2D
   */
  public draw(ctx: CanvasRenderingContext2D): void {
    this.move();
    this.changeDirection();
    ctx.drawImage(
      Game.loadNewImage('./assets/img/Microbug.png'),
      this.x + (window.innerWidth / 6),
      this.y + (window.innerHeight / 5),
      this.tileSize,
      this.tileSize,
    );
  }

  /**
   * Check for enemy collide with password
   *
   * @returns true or false
   */
  public checkForPasswordDamage(): boolean {
    if (this.tileMaps.collideWithPassword(this.x, this.y)) {
      return true;
    }
    return false;
  }

  /**
   * Check if enemy collide with player
   *
   * @param player Player class
   * @returns true or false
   */
  public collideWith(player: Player): boolean {
    const size = this.tileSize / 2;
    if (
      this.x < player.getXPos() + size
      && this.x + size > player.getXPos()
      && this.y < player.getYPos() + size
      && this.y + size > player.getYPos()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Getter for enemy x position
   *
   * @returns enemy x position
   */
  public getXPos(): number {
    return this.x;
  }

  /**
   * Getter for enemy y position
   *
   * @returns enemy y position
   */
  public getYPos(): number {
    return this.y;
  }
}
