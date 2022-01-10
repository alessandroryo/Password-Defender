export default class MovingDirection {
    up;
    down;
    left;
    right;
    constructor() {
        this.up = 0;
        this.down = 1;
        this.left = 2;
        this.right = 3;
    }
    getMDUp() {
        return this.up;
    }
    getMDDown() {
        return this.down;
    }
    getMDLeft() {
        return this.left;
    }
    getMDRight() {
        return this.right;
    }
}
//# sourceMappingURL=MovingDirection.js.map