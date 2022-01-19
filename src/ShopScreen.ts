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

  private playerSkins: Array<{name: string, skin: string, price: number, bought: boolean}> = [];

  private boughtSkins: string[];

  private wallSkins: unknown[];

  /**
   * Construct the introduction screen class
   *
   * @param game Game class
   */
  public constructor(game :Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
    this.skinImage1 = Game.loadNewImage('');
    this.vaultMoney = UserData.getVaultValue();

    if (localStorage.getItem('playerSkins') !== null) {
      this.playerSkins = JSON.parse(localStorage.getItem('playerSkins'));
    } else {
      this.playerSkins = [
        {
          name: 'Normal Linux',
          skin: './assets/img/Linux-Logo-Love.png',
          price: 2000,
          bought: true,
        }, {
          name: 'Love Linux',
          skin: './assets/img/Linux-Logo-Love.png',
          price: 2000,
          bought: false,
        }, {
          name: 'Linux GEGE',
          skin: './assets/img/Linux-Logo-Love.png',
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
          skin: './assets/img/Wall-darkBlue.png',
          price: 0,
          bought: true,
        }, {
          name: 'Dark-Blue Wall',
          skin: './assets/img/Wall-darkBlue.png',
          price: 2000,
          bought: false,
        }, {
          name: 'Darkblue Wall',
          skin: './assets/img/Wall-darkBlue.png',
          price: 2000,
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
      localStorage.setItem('boughtSkins', JSON.stringify(this.boughtSkins));
      this.nextScene = true;
      return;
    }
    if (this.keyBoard.isKeyDown(KeyListener.KEY_1)) this.requestSkin(1); return;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_2)) this.requestSkin(2); return;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_3)) this.requestSkin(3); return;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_4)) this.requestSkin(4); return;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_5)) this.requestSkin(5); return;
    if (this.keyBoard.isKeyDown(KeyListener.KEY_6)) this.requestSkin(6); return;
  }

  private requestSkin(skinNumber: number): void {
    if (skinNumber < 4) {
      const selected = this.playerSkins[skinNumber - 1];
      this.buyPlayerSkin(selected.name, selected.price);
      return;
    }
    return;
  }

  private buyPlayerSkin(name: string, price: number): void {
    if (price > UserData.getVaultValue()) this.notAffordable(); return;
    UserData.changeVaultValue(-price);
    this.boughtSkins.push(name);
  }

  private notAffordable(): void {

  }

  private addBoughtSkin(name: string): void {
    this.boughtSkins.push(name);
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
      (this.game.canvas.width / 2) - 300,
      600,
    );
  }
}
