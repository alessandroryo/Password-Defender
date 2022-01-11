import KeyListener from './KeyboardListener.js';
export default class Scene {
    game;
    canvas;
    nextScene;
    keyBoard;
    constructor(game) {
        this.game = game;
        this.nextScene = false;
        this.keyBoard = new KeyListener();
    }
}
//# sourceMappingURL=Scene.js.map