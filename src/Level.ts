import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import Player from './Player.js';
import EnemyVirus from './EnemyVirus.js';
import GameOverScreen from './GameOverScreen.js';
import WinningScreen from './WinningScreen.js';
import PowerUps from './PowerUps.js';

export default class Level extends Scene {
  private tileMaps: TileMaps;

  private logo: HTMLImageElement;

  private enemyCount: number;

  private gameOver: GameOverScreen;

  private winGame: WinningScreen;

  private player: Player;

  private enemies: EnemyVirus[];

  private triggerTimer: number;

  private triggerAgain: boolean;

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    super(game);
    this.logo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.tileMaps = new TileMaps(game);
    this.player = this.tileMaps.getPlayer();
    this.triggerTimer = 0;
    this.triggerAgain = true;

    this.enemies = [];
    this.enemyCount = 4;

    for (let index = 0; index < this.enemyCount; index++) {
      this.enemies.push(this.tileMaps.getEnemies());
    }
  }

  /**
   *
   */
  public processInput(): void {
    this.player.handleKeyInput();
    this.player.move();
  }

  /**
   *
   */
  public render(): void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.game.ctx.drawImage(
      this.logo,
      this.game.canvas.width * 0.41,
      this.game.canvas.height * 0.01,
      this.logo.width / 3,
      this.logo.height / 3,
    );

    this.game.writeTextToCanvas(
      `Score: ${this.game.getUserData().getScore()}`,
      this.game.canvas.width * 0.75,
      this.game.canvas.height * 0.2,
      40,
    );

    this.tileMaps.draw(this.game.ctx);

    this.enemies.forEach((enemy) => {
      enemy.draw(this.game.ctx);
    });

    this.player.draw(this.game.ctx);
  }

  /**
   *
   * @returns New scene
   */
  public update(): Scene {
    this.checkForDamage();
    this.checkCollisionPassword();
    if (this.checkGameOver()) {
      return new GameOverScreen(this.game);
    }
    if (this.checkGameWin()) {
      return new WinningScreen(this.game);
    }
    return null;
  }

  private checkForDamage(): void {
    this.triggerTimer += 1;
    if (!this.checkForNeed()) return;
    console.log(this.triggerAgain);
    if (this.triggerAgain === true) {
      console.log('triggered');
      this.triggerAgain = false;
      this.game.getUserData().revealCount += 2;
      this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
    } else if (this.triggerAgain === false && this.triggerTimer >= 60) {
      this.triggerAgain = true;
      this.triggerTimer = 0;
    }
  }

  /**
   * If the player collides with enemy, default true answer, if not,
   * check the enemies, the first hit will quit the find iteration
   *
   * @returns true to continue the checkForDamage(), or false
   */
  private checkForNeed(): boolean {
    if (this.player.collideWithEnemy(this.enemies)) return true;
    const target = this.enemies.find((enemy) => enemy.checkForDamage());
    // this.enemies.splice(this.enemies.findIndex(target), 1);
    return target !== undefined;
  }

  private checkGameOver() : boolean {
    if (this.game.getUserData().revealCount >= this.game.getUserData().getPassword().length) {
      return true;
    }
    return false;
  }

  private checkGameWin() : boolean {
    if (this.game.getUserData().getScore() === 364) {
      return true;
    }
    return false;
  }

  private checkCollisionPassword() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.checkForDamage()) {
        // this.enemies.pop();
        return false;
      }
      return true;
    });
  }
}
