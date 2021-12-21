import Scene from './Scene.js';
import Player from './Player.js';
export default class Level extends Scene {
    player;
    countUntilNextItem;
    constructor(game) {
        super(game);
        this.player = new Player(this.game.canvas.width, this.game.canvas.height);
        this.countUntilNextItem = 360;
    }
    processInput() {
        return null;
    }
    render() {
        return null;
    }
    update(elapsed) {
        return null;
    }
}
//# sourceMappingURL=Level.js.map