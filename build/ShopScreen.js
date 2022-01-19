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
    wallSkins;
    constructor(game) {
        super(game);
        this.mainLogo = Game.loadNewImage('./assets/img/Game-Logo-(Secondary).png');
        this.buttonImage = Game.loadNewImage('./assets/img/Press-Enter-Continue.png');
        this.skinImage1 = Game.loadNewImage('');
        this.vaultMoney = UserData.getVaultValue();
        if (localStorage.getItem('playerSkins') !== null) {
            this.playerSkins = JSON.parse(localStorage.getItem('playerSkins'));
        }
        else {
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
        }
        else {
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
    processInput() {
        if (this.keyBoard.isKeyDown(KeyListener.KEY_ENTER)) {
            localStorage.setItem('playerSkins', JSON.stringify(this.playerSkins));
            localStorage.setItem('wallSkins', JSON.stringify(this.wallSkins));
            localStorage.setItem('boughtSkins', JSON.stringify(this.boughtSkins));
            this.nextScene = true;
            return;
        }
        if (this.keyBoard.isKeyDown(KeyListener.KEY_1))
            this.requestSkin(1);
        return;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_2))
            this.requestSkin(2);
        return;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_3))
            this.requestSkin(3);
        return;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_4))
            this.requestSkin(4);
        return;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_5))
            this.requestSkin(5);
        return;
        if (this.keyBoard.isKeyDown(KeyListener.KEY_6))
            this.requestSkin(6);
        return;
    }
    requestSkin(skinNumber) {
        if (skinNumber < 4) {
            const selected = this.playerSkins[skinNumber - 1];
            this.buyPlayerSkin(selected.name, selected.price);
            return;
        }
        return;
    }
    buyPlayerSkin(name, price) {
        if (price > UserData.getVaultValue())
            this.notAffordable();
        return;
        UserData.changeVaultValue(-price);
        this.boughtSkins.push(name);
    }
    notAffordable() {
    }
    addBoughtSkin(name) {
        this.boughtSkins.push(name);
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
        this.game.ctx.drawImage(this.buttonImage, (this.game.canvas.width / 2) - 300, 600);
    }
}
//# sourceMappingURL=ShopScreen.js.map