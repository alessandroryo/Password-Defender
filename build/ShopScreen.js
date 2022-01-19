import Scene from './Scene.js';
import KeyListener from './KeyboardListener.js';
import Game from './Game.js';
import UserData from './UserData.js';
import StartScreen from './StartScreen.js';
export default class ShopScreen extends Scene {
    mainLogo;
    buttonImage;
    button;
    skinImage1;
    vaultMoney;
    playerSkins = [];
    boughtSkins;
    wallSkins = [];
    errorPic;
    error;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
        this.errorPic = Game.loadNewImage('./assets/img/not-enough-cookies.png');
        this.skinImage1 = Game.loadNewImage('');
        this.vaultMoney = UserData.getVaultValue();
        this.error = false;
        if (localStorage.getItem('playerSkins') !== null) {
            this.playerSkins = JSON.parse(localStorage.getItem('playerSkins'));
        }
        else {
            this.playerSkins = [
                {
                    name: 'Normal Linux',
                    path: './assets/img/Linux-Logo-Love.png',
                    price: 0,
                    bought: true,
                }, {
                    name: 'Love Linux',
                    path: './assets/img/Linux-Logo-Love.png',
                    price: 2000,
                    bought: false,
                }, {
                    name: 'Linux GEGE',
                    path: './assets/img/Linux-Logo-Love.png',
                    price: 2000,
                    bought: false,
                },
            ];
        }
        if (localStorage.getItem('wallSkins') !== null) {
            this.wallSkins = JSON.parse(localStorage.getItem('wallSkins'));
        }
        else {
            this.wallSkins = [
                {
                    name: 'Normal Wall',
                    path: './assets/img/Wall-darkBlue.png',
                    price: 0,
                    bought: true,
                }, {
                    name: 'Dark-Blue Wall',
                    path: './assets/img/Wall-darkBlue.png',
                    price: 2000,
                    bought: false,
                }, {
                    name: 'Darkblue Wall',
                    path: './assets/img/Wall-darkBlue.png',
                    price: 2000,
                    bought: false,
                },
            ];
        }
    }
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            localStorage.setItem('playerSkins', JSON.stringify(this.playerSkins));
            localStorage.setItem('wallSkins', JSON.stringify(this.wallSkins));
            this.nextScene = true;
            return;
        }
        if (this.keyBoard.isKeyDown(KeyListener.KEY_1))
            this.requestSkin(1);
        if (this.keyBoard.isKeyDown(KeyListener.KEY_2))
            this.requestSkin(2);
        if (this.keyBoard.isKeyDown(KeyListener.KEY_3))
            this.requestSkin(3);
        if (this.keyBoard.isKeyDown(KeyListener.KEY_4))
            this.requestSkin(4);
        if (this.keyBoard.isKeyDown(KeyListener.KEY_5))
            this.requestSkin(5);
        if (this.keyBoard.isKeyDown(KeyListener.KEY_6))
            this.requestSkin(6);
    }
    requestSkin(skinNumber) {
        const vault = UserData.getVaultValue();
        if (this.playerSkins[skinNumber - 1].price > vault
            || this.wallSkins[skinNumber - 4].price > vault) {
            this.error = true;
            return;
        }
        if (skinNumber < 4) {
            const selected = this.playerSkins[skinNumber - 1];
            if (selected.bought === true)
                ShopScreen.changePlayerSkin(selected.path);
            return;
            UserData.changeVaultValue(-selected.price);
            selected.bought = true;
            return;
        }
        const selected = this.wallSkins[skinNumber - 1];
    }
    update() {
        if (this.nextScene) {
            return new StartScreen(this.game);
        }
        return null;
    }
    static changePlayerSkin(skinSrc) {
        localStorage.setItem('playerSkinSrc', skinSrc);
    }
    static changeWallSkin(skinSrc) {
        localStorage.setItem('wallSkinSrc', skinSrc);
    }
    render() {
        this.game.ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        this.game.ctx.drawImage(this.mainLogo, (this.game.canvas.width / 2) - 110, 0, this.mainLogo.width / 4.5, this.mainLogo.height / 4.5);
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - (this.buttonImage.width / 2), this.game.canvas.height * (85 / 100));
        if (this.error === true) {
            this.game.ctx.drawImage(this.errorPic, (this.game.canvas.width / 2) - (this.errorPic.width / 2), this.game.canvas.height * (15 / 100));
            setTimeout(() => { this.error = false; }, 1000);
        }
    }
}
//# sourceMappingURL=ShopScreen.js.map