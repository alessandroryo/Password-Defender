import Game from './Game.js';
import MovingDirection from './MovingDirection.js';
export default class EnemyVirus {
    x;
    y;
    tileSize;
    velocity;
    tileMap;
    movingDirection;
    directionTimerDefault;
    directionTimer;
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = 20;
        this.directionTimer = this.directionTimerDefault;
    }
    move() {
        if (!this.tileMap.collideWithEnvironment(this.x, this.y, this.movingDirection)) {
            switch (this.movingDirection) {
                case MovingDirection.getMDUp():
                    this.y -= this.velocity;
                    break;
                case MovingDirection.getMDDown():
                    this.y += this.velocity;
                    break;
                case MovingDirection.getMDLeft():
                    this.x -= this.velocity;
                    break;
                case MovingDirection.getMDRight():
                    this.x += this.velocity;
                    break;
                default:
                    break;
            }
        }
    }
    draw(ctx) {
        this.move();
        this.changeDirection();
        ctx.drawImage(Game.loadNewImage('./assets/img/Microbug.png'), this.x + 300, this.y + 200, this.tileSize, this.tileSize);
    }
    changeDirection() {
        this.directionTimer -= 2;
        let newMoveDirection = null;
        if (this.directionTimer === 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        }
        if (newMoveDirection != null && this.movingDirection !== newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize)
                && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.collideWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
            }
        }
    }
    getXPos() {
        return this.x;
    }
    getYPos() {
        return this.y;
    }
}
//# sourceMappingURL=EnemyVirus.js.map