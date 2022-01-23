import Game from './Game.js';
import MovingDirection from './MovingDirection.js';
import GameEntity from './GameEntity.js';
import PowerupPopup from './PowerupPopup.js';
export default class EnemyVirus extends GameEntity {
    directionTimer;
    directionTimerDefault;
    movingDirection;
    constructor(x, y, tileSize, tileMaps, gameMap) {
        super(x, y, tileSize, tileMaps, gameMap);
        this.velocity = 2;
        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = 20;
        this.directionTimer = this.directionTimerDefault;
        PowerupPopup.allowedToMove = true;
    }
    move() {
        if (!this.tileMaps.collideWithEnvironment(this.x, this.y, this.movingDirection)) {
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
    changeDirection() {
        if (PowerupPopup.allowedToMove === true) {
            this.directionTimer -= 2;
            let newMoveDirection = null;
            if (this.directionTimer === 0) {
                this.directionTimer = this.directionTimerDefault;
                newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
            }
            if (newMoveDirection != null && this.movingDirection !== newMoveDirection) {
                if (Number.isInteger(this.x / this.tileSize)
                    && Number.isInteger(this.y / this.tileSize)) {
                    if (!this.tileMaps.collideWithEnvironment(this.x, this.y, newMoveDirection)) {
                        this.movingDirection = newMoveDirection;
                    }
                }
            }
        }
    }
    draw(ctx) {
        this.move();
        this.changeDirection();
        ctx.drawImage(Game.loadNewImage('./assets/img/Microbug.png'), this.x + (window.innerWidth / 6), this.y + (window.innerHeight / 5), this.tileSize, this.tileSize);
    }
    checkForPasswordDamage() {
        if (this.tileMaps.collideWithPassword(this.x, this.y)) {
            return true;
        }
        return false;
    }
    collideWith(player) {
        const size = this.tileSize / 2;
        if (this.x < player.getXPos() + size
            && this.x + size > player.getXPos()
            && this.y < player.getYPos() + size
            && this.y + size > player.getYPos()) {
            return true;
        }
        return false;
    }
    getXPos() {
        return this.x;
    }
    getYPos() {
        return this.y;
    }
}
//# sourceMappingURL=EnemyVirus.js.map