export default class MovingDirection {
    static up;
    static down;
    static left;
    static right;
    constructor() {
        MovingDirection.up = 0;
        MovingDirection.down = 1;
        MovingDirection.left = 2;
        MovingDirection.right = 3;
    }
    static getMDUp() {
        return this.up;
    }
    static getMDDown() {
        return this.down;
    }
    static getMDLeft() {
        return this.left;
    }
    static getMDRight() {
        return this.right;
    }
}
//# sourceMappingURL=MovingDirection.js.map