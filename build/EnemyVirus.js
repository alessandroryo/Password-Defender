import Game from './Game.js';
import MovingDirection from './MovingDirection.js';
import GameEntity from './GameEntity.js';
import PowerupPopup from './PowerupPopup.js';
export default class EnemyVirus extends GameEntity {
    directionTimer;
    directionTimerDefault;
    movingDirection;
    constructor(column, row, tileSize, tileMaps, gameMap) {
        super(column, row, tileSize, tileMaps, gameMap);
        this.velocity = 2;
        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        this.directionTimerDefault = 20;
        this.directionTimer = this.directionTimerDefault;
        PowerupPopup.allowedToMove = true;
    }
    move() {
        if (!this.tileMaps.collideWithEnvironment(this.column, this.row, this.movingDirection)) {
            switch (this.movingDirection) {
                case MovingDirection.getMDUp():
                    this.row -= this.velocity;
                    break;
                case MovingDirection.getMDDown():
                    this.row += this.velocity;
                    break;
                case MovingDirection.getMDLeft():
                    this.column -= this.velocity;
                    break;
                case MovingDirection.getMDRight():
                    this.column += this.velocity;
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
                if (Number.isInteger(this.column / this.tileSize)
                    && Number.isInteger(this.row / this.tileSize)) {
                    if (!this.tileMaps.collideWithEnvironment(this.column, this.row, newMoveDirection)) {
                        this.movingDirection = newMoveDirection;
                    }
                }
            }
        }
    }
    draw(ctx) {
        this.move();
        this.changeDirection();
        ctx.drawImage(Game.loadNewImage('./assets/img/Microbug.png'), this.column + (window.innerWidth / 6), this.row + (window.innerHeight / 5), this.tileSize, this.tileSize);
    }
    checkForPasswordDamage() {
        if (this.tileMaps.collideWithPassword(this.column, this.row)) {
            return true;
        }
        return false;
    }
    collideWith(player) {
        const size = this.tileSize / 2;
        if (this.column < player.getXPos() + size
            && this.column + size > player.getXPos()
            && this.row < player.getYPos() + size
            && this.row + size > player.getYPos()) {
            return true;
        }
        return false;
    }
    getXPos() {
        return this.column;
    }
    getYPos() {
        return this.row;
    }
}
//# sourceMappingURL=EnemyVirus.js.map