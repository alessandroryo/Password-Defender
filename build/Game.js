import GameLoop from './GameLoop.js';
import StartScreen from './StartScreen.js';
export default class Game {
    canvas;
    ctx;
    scene;
    gameLoop;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameLoop = new GameLoop();
        this.scene = new StartScreen(this);
        this.gameLoop.start(this.scene);
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
        return Math.round(Math.random() * (max - min) + min);
    }
}
//# sourceMappingURL=Game.js.map