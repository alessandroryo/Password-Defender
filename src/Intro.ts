import Game from "./Game";
import KeyListener from "./KeyListener.js";
import Scene from "./Scene";

console.log('its woking');


export default class IntroScreen extends Scene{
    //public canvas: HTMLCanvasElement;
    private keyListener: KeyListener;

   /**
   * @param game
   */
  
    public constructor(game :Game){
        super(game);
        // this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyListener = new KeyListener
    }

    public processInput(): void {
        if (this.keyListener.isKeyDown(KeyListener.KEY_ENTER)){
        this.shouldStart = true;}
    }

    /**
   * @param elapsed
   */
    update(): Scene {
    return null;
  }


    render():void{
        this.game.writeTextToCanvas('instructions', this.game.canvas.width , this.game.canvas.height);
        this.game.writeTextToCanvas('press Enter', this.game.canvas.width , this.game.canvas.height);
    }
}

