import GameLoop from './GameLoop.js';
import UserData from './UserData.js';
import TileMaps from './TileMaps.js';
import StartScreen from './StartScreen.js';
export default class Game {
    canvas;
    ctx;
    gameLoop;
    scene;
    user;
    tileMaps;
    velocity;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.scene = new StartScreen(this);
        this.gameLoop.start(this.scene);
        this.user = new UserData();
        console.log('Game.ts working');
        this.tileMaps = new TileMaps(this);
    }
    writeTextToCanvas(text, xCoordinate, yCoordinate, fontSize = 20, color = 'white', alignment = 'center') {
        const ctx = this.canvas.getContext('2d');
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (min - max) + min);
    }
}
//# sourceMappingURL=Game.js.map