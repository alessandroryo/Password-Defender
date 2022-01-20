import Scene from './Scene.js';
import KeyListener from './KeyboardListener.js';
import Game from './Game.js';
import UserData from './UserData.js';
import StartScreen from './StartScreen.js';

export default class ShopScreen extends Scene {
  private mainLogo: HTMLImageElement;

  private buttonImage: HTMLImageElement;

  private cookieImage: HTMLImageElement;

  private errorPic: HTMLImageElement;

  private playerSkins: Array<{ name: string, path: string, price: number, bought: boolean }> = [];

  private wallSkins: Array<{ name: string, path: string, price: number, bought: boolean }> = [];

  private error: boolean;

  // Shop Pictures
  private playerSkin1: HTMLImageElement;

  private playerSkin2: HTMLImageElement;

  private playerSkin3: HTMLImageElement;

  private wallSkin1: HTMLImageElement;

  private wallSkin2: HTMLImageElement;

  private wallSkin3: HTMLImageElement;

  /**
   * Construct the introduction screen class
   *
   * @param game Game class
   */
  public constructor(game :Game) {
    super(game);
    this.mainLogo = Game.loadNewImage('../assets/img/Game-Logo-(Secondary).png');
    this.buttonImage = Game.loadNewImage('../assets/img/Press-Enter-Continue.png');
    this.errorPic = Game.loadNewImage('../assets/img/Not-Enough-Cookies.png');
    this.cookieImage = Game.loadNewImage('../assets/img/Cookie-Score.png');
    this.error = false;

    if (localStorage.getItem('playerSkins') !== null) {
      this.playerSkins = JSON.parse(localStorage.getItem('playerSkins'));
    } else {
      this.playerSkins = [
        {
          name: 'Linux',
          path: '../assets/img/Linux-Logo.png',
          price: 0,
          bought: true,
        }, {
          name: 'Astronaut',
          path: '../assets/img/Linux-Logo-Love.png',
          price: 2000,
          bought: false,
        }, {
          name: 'Windows',
          path: '../assets/img/Windows-Logo.png',
          price: 5000,
          bought: false,
        },
      ];
    }

    if (localStorage.getItem('wallSkins') !== null) {
      this.wallSkins = JSON.parse(localStorage.getItem('wallSkins'));
    } else {
      this.wallSkins = [
        {
          name: 'Wall',
          path: '../assets/img/Wall.png',
          price: 0,
          bought: true,
        }, {
          name: 'Dark-Blue Wall',
          path: '../assets/img/Wall-DarkBlue.png',
          price: 2000,
          bought: false,
        }, {
          name: 'Obsidian Wall',
          path: '../assets/img/Wall-End.png',
          price: 5000,
          bought: false,
        },
      ];
    }
    // Shop Pictures
    this.playerSkin1 = Game.loadNewImage(this.playerSkins[0].path);
    this.playerSkin2 = Game.loadNewImage(this.playerSkins[1].path);
    this.playerSkin3 = Game.loadNewImage(this.playerSkins[2].path);
    this.wallSkin1 = Game.loadNewImage(this.wallSkins[0].path);
    this.wallSkin2 = Game.loadNewImage(this.wallSkins[1].path);
    this.wallSkin3 = Game.loadNewImage(this.wallSkins[2].path);
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
   *
   * @param skinSrc needs to hold the file path to the new image
   */
  public static changePlayerSkin(skinSrc: string): void {
    localStorage.setItem('playerSkinSrc', skinSrc);
  }

  /**
   * Changes the wall skin to the given value
   *
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
    // Draw Logo
    this.game.ctx.drawImage(
      this.mainLogo,
      (this.game.canvas.width / 2) - 110,
      0,
      this.mainLogo.width / 4.5,
      this.mainLogo.height / 4.5,
    );
    // Draw go-back button
    this.game.ctx.drawImage(
      this.buttonImage,
      (this.game.canvas.width / 2) - (this.buttonImage.width / 2),
      this.game.canvas.height * (85 / 100),
    );
    // Title
    this.game.writeTextToCanvas(
      'Shop',
      this.game.canvas.width / 2,
      this.game.canvas.height * (16 / 100),
      70,
    );
    // Show vault
    this.game.ctx.drawImage(
      this.cookieImage,
      (this.game.canvas.width / 6),
      ((this.mainLogo.height / 4.5) / 2) - (this.cookieImage.height / 2),
    );
    this.game.writeTextToCanvas(
      localStorage.getItem('vault'),
      (this.game.canvas.width / 6) + (this.cookieImage.width + 5),
      ((this.mainLogo.height / 4.5) / 2) + 12,
      45,
      'white',
      'left',
    );
    // Not enough Cookies screen
    if (this.error === true) {
      this.game.ctx.drawImage(
        this.errorPic,
        (this.game.canvas.width / 2) - (this.errorPic.width / 2),
        this.game.canvas.height * (45 / 100),
      );
      setTimeout(() => { this.error = false; }, 500);
    }
    // From here are only the shop images
    // Player Skin
    const selected = localStorage.getItem('playerSkinSrc');
    const canvasWidth = this.game.canvas.width;
    const canvasHeight = this.game.canvas.height;
    this.game.ctx.drawImage(
      this.playerSkin1,
      canvasWidth * 0.25 - ((this.playerSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.2,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin1 = this.playerSkins[0];
    this.game.writeTextToCanvas(
      `${selcetedSkin1.name}`,
      canvasWidth * 0.25,
      canvasHeight * 0.2 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin1.price}`,
      canvasWidth * 0.25,
      canvasHeight * 0.2 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin1.bought}`,
      canvasWidth * 0.25,
      canvasHeight * 0.2 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin1.path === selected) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.25,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 1 to select',
        canvasWidth * 0.25,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }

    this.game.ctx.drawImage(
      this.playerSkin2,
      canvasWidth * 0.5 - ((this.playerSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.2,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin2 = this.playerSkins[1];
    this.game.writeTextToCanvas(
      `${selcetedSkin2.name}`,
      canvasWidth * 0.5,
      canvasHeight * 0.2 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin2.price}`,
      canvasWidth * 0.5,
      canvasHeight * 0.2 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin2.bought}`,
      canvasWidth * 0.5,
      canvasHeight * 0.2 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin2.path === selected) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.5,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 2 to select',
        canvasWidth * 0.5,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }
    this.game.ctx.drawImage(
      this.playerSkin3,
      canvasWidth * 0.75 - ((this.playerSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.2,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin3 = this.playerSkins[2];
    this.game.writeTextToCanvas(
      `${selcetedSkin3.name}`,
      canvasWidth * 0.75,
      canvasHeight * 0.2 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin3.price}`,
      canvasWidth * 0.75,
      canvasHeight * 0.2 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin3.bought}`,
      canvasWidth * 0.75,
      canvasHeight * 0.2 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin3.path === selected) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.75,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 3 to select',
        canvasWidth * 0.75,
        canvasHeight * 0.2 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }
    // Wall Skins
    const selected2 = localStorage.getItem('wallSkinSrc');
    this.game.ctx.drawImage(
      this.wallSkin1,
      canvasWidth * 0.25 - ((this.wallSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.55,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin4 = this.wallSkins[0];
    this.game.writeTextToCanvas(
      `${selcetedSkin4.name}`,
      canvasWidth * 0.25,
      canvasHeight * 0.55 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin4.price}`,
      canvasWidth * 0.25,
      canvasHeight * 0.55 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin4.bought}`,
      canvasWidth * 0.25,
      canvasHeight * 0.55 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin4.path === selected2) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.25,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 4 to select',
        canvasWidth * 0.25,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }
    this.game.ctx.drawImage(
      this.wallSkin2,
      canvasWidth * 0.5 - ((this.wallSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.55,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin5 = this.wallSkins[1];
    this.game.writeTextToCanvas(
      `${selcetedSkin5.name}`,
      canvasWidth * 0.5,
      canvasHeight * 0.55 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin5.price}`,
      canvasWidth * 0.5,
      canvasHeight * 0.55 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin5.bought}`,
      canvasWidth * 0.5,
      canvasHeight * 0.55 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin5.path === selected2) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.5,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 5 to select',
        canvasWidth * 0.5,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }
    this.game.ctx.drawImage(
      this.wallSkin3,
      canvasWidth * 0.75 - ((this.wallSkin2.width * 2.5) * 0.5),
      canvasHeight * 0.55,
      32 * 2.5,
      32 * 2.5,
    );
    const selcetedSkin6 = this.wallSkins[2];
    this.game.writeTextToCanvas(
      `${selcetedSkin6.name}`,
      canvasWidth * 0.75,
      canvasHeight * 0.55 + ((32 * 2.5) + 20),
      25,
    );
    this.game.writeTextToCanvas(
      `Price: ${selcetedSkin6.price}`,
      canvasWidth * 0.75,
      canvasHeight * 0.55 + ((32 * 2.5) + 40),
      20,
    );
    this.game.writeTextToCanvas(
      `Owned: ${selcetedSkin6.bought}`,
      canvasWidth * 0.75,
      canvasHeight * 0.55 + ((32 * 2.5) + 60),
      20,
    );
    if (selcetedSkin6.path === selected2) {
      this.game.writeTextToCanvas(
        'Selected',
        canvasWidth * 0.75,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(244, 232, 137)',
      );
    } else {
      this.game.writeTextToCanvas(
        'Press 6 to select',
        canvasWidth * 0.75,
        canvasHeight * 0.55 + ((32 * 2.5) + 90),
        20,
        'rgb(250, 188, 63)',
      );
    }
  }
}
