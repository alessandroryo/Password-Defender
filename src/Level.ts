import Scene from './Scene.js';
import Game from './Game.js';
import TileMaps from './TileMaps.js';
import Player from './Player.js';
import EnemyVirus from './EnemyVirus.js';
import GameOverScreen from './GameOverScreen.js';
import WinningScreen from './WinningScreen.js';
import GameMap from './GameMap.js';

export default class Level extends Scene {
  private tileMaps: TileMaps;

  private logo: HTMLImageElement;

  // private enemyCount: number;

  private gameOver: GameOverScreen;

  private winGame: WinningScreen;

  private player: Player;

  private enemies: EnemyVirus[];

  private triggerTimer: number;

  private triggerAgain: boolean;

  private gameMap: GameMap[];

  /**
   *
   * @param game Game class
   */
  constructor(game: Game) {
    super(game);
    this.tileMaps = new TileMaps(game);

    this.logo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');

    this.player = this.tileMaps.getPlayer();
    this.enemies = [];
    for (let index = 0; index < this.tileMaps.getEnemyCount(); index++) {
      this.enemies.push(this.tileMaps.getEnemies());
    }

    this.triggerTimer = 0;
    this.triggerAgain = true;
  }

  /**
   * Process input in level
   */
  public processInput(): void {
    this.player.handleKeyInput();
    this.player.move();
  }

  /**
   * Update scene
   *
   * @returns New scene
   */
  public update(): Scene {
    this.player.update();
    this.checkForDamage();
    this.checkEnemyCollisionPassword();
    this.checkEatEnemy();
    if (this.checkGameOver()) {
      return new GameOverScreen(this.game);
    }
    if (this.checkGameWin()) {
      return new WinningScreen(this.game);
    }
    return null;
  }

  /**
   * Rendering level into canvas
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

  private checkForDamage(): void {
    this.triggerTimer += 1;

    if (
      !this.checkForVPN()
      || !this.checkEatEnemy()
    ) {
      return;
    }
    if (this.triggerAgain === true) {
      this.triggerAgain = false;
      this.game.getUserData().revealCount += 2;
      this.game.getUserData().revealDisplayedPassword(this.game.getUserData().revealCount);
    } else if (this.triggerAgain === false && this.triggerTimer >= 60) {
      this.triggerAgain = true;
      this.triggerTimer = 0;
    }
  }

  private checkForVPN(): boolean {
    if (
      this.player.collideWithEnemy(this.enemies)
      && (!this.player.getVPNActive())
    ) {
      return true;
    }
    return this.enemies.find((enemy) => enemy.checkForPasswordDamage()) !== undefined;
  }

  private checkEnemyCollisionPassword() {
    this.enemies = this.enemies.filter((enemy) => {
      if (enemy.checkForPasswordDamage()) {
        return false;
      }
      return true;
    });
  }

  private checkEatEnemy() {
    if (
      this.player.collideWithEnemy(this.enemies)
      && !this.player.getAVActive()
    ) {
      return true;
    }
    return this.enemies.find(
      (enemy) => enemy.checkForPlayerDamage(),
    ) !== undefined;
  }

  private checkGameOver() : boolean {
    if (
      this.game.getUserData().revealCount >= this.game.getUserData().getPassword().length
    ) {
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
}
