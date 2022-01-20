import Scene from './Scene.js';
import KeyListener from './KeyboardListener.js';
import Game from './Game.js';
import UserData from './UserData.js';
import StartScreen from './StartScreen.js';

export default class ShopScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private button: HTMLElement;

  private skinImage1: HTMLImageElement;

  private vaultMoney: number;

  private playerSkins: Array<{ name: string, path: string, price: number, bought: boolean }> = [];

  private boughtSkins: string[];

  private wallSkins: Array<{ name: string, path: string, price: number, bought: boolean }> = [];

  private errorPic: HTMLImageElement;

  private error: boolean;

  /**
   * Construct the introduction screen class
   *
   * @param game Game class
   */
  public constructor(game :Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
    this.errorPic = Game.loadNewImage('./assets/img/not-enough-cookies.png');
    this.skinImage1 = Game.loadNewImage('');
    this.vaultMoney = UserData.getVaultValue();
    this.error = false;

    if (localStorage.getItem('playerSkins') !== null) {
      this.playerSkins = JSON.parse(localStorage.getItem('playerSkins'));
    } else {
      this.playerSkins = [
        {
          name: 'Normal Linux',
          path: './assets/img/Linux-Logo.png',
          price: 0,
          bought: true,
        }, {
          name: 'Love Linux',
          path: './assets/img/Linux-Logo-Love.png',
          price: 2000,
          bought: false,
        }, {
          name: 'Windows',
          path: './assets/img/Windows-Logo.png',
          price: 2000,
          bought: false,
        },
      ];
    }

    if (localStorage.getItem('wallSkins') !== null) {
      this.wallSkins = JSON.parse(localStorage.getItem('wallSkins'));
    } else {
      this.wallSkins = [
        {
          name: 'Normal Wall',
          path: './assets/img/Wall.png',
          price: 0,
          bought: true,
        }, {
          name: 'Dark-Blue Wall',
          path: './assets/img/Wall-DarkBlue.png',
          price: 4000,
          bought: false,
        }, {
          name: 'Golden Wall',
          path: './assets/img/Wall-Golden.png',
          price: 10000,
          bought: false,
        },
      ];
    }
  }

  /**
   *
   */
  public processInput(): void {
    if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
      localStorage.setItem('playerSkins', JSON.stringify(this.playerSkins));
      localStorage.setItem('wallSkins', JSON.stringify(this.wallSkins));
      this.nextScene = true;
      return;
    }
    if (this.keyBoard.isKeyDown(KeyListener.KEY_1)) this.requestPlayerSkin(1);
    if (this.keyBoard.isKeyDown(KeyListener.KEY_2)) this.requestPlayerSkin(2);
    if (this.keyBoard.isKeyDown(KeyListener.KEY_3)) this.requestPlayerSkin(3);
    if (this.keyBoard.isKeyDown(KeyListener.KEY_4)) this.requestWallSkin(1);
    if (this.keyBoard.isKeyDown(KeyListener.KEY_5)) this.requestWallSkin(2);
    if (this.keyBoard.isKeyDown(KeyListener.KEY_6)) this.requestWallSkin(3);
  }

  private requestPlayerSkin(skinNumber: number): void {
    const selected = this.playerSkins[skinNumber - 1];
    if (selected.bought === true) { ShopScreen.changePlayerSkin(selected.path); return; }
    const vault = UserData.getVaultValue();
    if (this.playerSkins[skinNumber - 1].price > vault) {
      this.error = true;
      return;
    }
    UserData.changeVaultValue(-selected.price);
    selected.bought = true;
  }

  private requestWallSkin(skinNumber: number): void {
    const selected = this.wallSkins[skinNumber - 1];
    if (selected.bought === true) { ShopScreen.changeWallSkin(selected.path); return; }
    const vault = UserData.getVaultValue();
    if (this.wallSkins[skinNumber - 1].price > vault) {
      this.error = true;
      return;
    }
    UserData.changeVaultValue(-selected.price);
    selected.bought = true;
  }

  /**
   * Method for update the screen
   *
   * @returns New scene
   */
  public update(): Scene {
    if (this.nextScene) {
      return new StartScreen(this.game);
    }
    return null;
  }

  /**
   * Changes the player skin to the given value
   * @param skinSrc needs to hold the file path to the new image
   */
  public static changePlayerSkin(skinSrc: string): void {
    localStorage.setItem('playerSkinSrc', skinSrc);
  }

  /**
   * Changes the wall skin to the given value
   * @param skinSrc needs to hold the file path to the new image
   */
  public static changeWallSkin(skinSrc: string): void {
    localStorage.setItem('wallSkinSrc', skinSrc);
  }

  /**
   *
   */
  public render():void {
    this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 110,
      0,
      this.mainLogo.width / 4.5,
      this.mainLogo.height / 4.5,
    );
    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - (this.buttonImage.width / 2),
      this.game.canvas.height * (85 / 100),
    );
    if (this.error === true) {
      this.game.ctx.drawImage(
        this.errorPic,
        (this.game.canvas.width / 2) - (this.errorPic.width / 2),
        this.game.canvas.height * (15 / 100),
      );
      setTimeout(() => { this.error = false; }, 500);
    }
  }
}
