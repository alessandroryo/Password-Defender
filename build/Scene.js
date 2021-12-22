import KeyListener from './KeyboardListener.js';
export default class Scene {
    game;
    canvas;
    shouldStart;
    unHideLogin;
    keyBoard;
    userEntered;
    firstEnter;
    constructor(game) {
        this.game = game;
        this.shouldStart = false;
        this.keyBoard = new KeyListener();
    }
}
//# sourceMappingURL=Scene.js.map