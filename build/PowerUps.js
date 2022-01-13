import Game from './Game.js';
export default class PowerUps {
    x;
    y;
    tileSize;
    tileMap;
    spawnTimerDefault;
    spawnTimer;
    powerupsOnField;
    gameMap;
    activeMap;
    powerUpActivity;
    constructor(x, y, tileSize, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.tileMap = tileMap;
        this.spawnTimerDefault = 20;
        this.spawnTimer = this.spawnTimerDefault;
        this.activeMap = 0;
        this.powerUpActivity = 0;
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage('./assets/img/Random-Box.png'), this.x + 300, this.y + 200, this.tileSize, this.tileSize);
    }
    checkForPowerUps() {
        this.powerupsOnField = this.gameMap.getGameMap()[this.activeMap].filter(element => element > 4);
        if (this.powerupsOnField.length > 1) {
            return true;
            console.log('true');
        }
        return false;
        console.log('false');
    }
    checkIfPowerUpActive() {
        if (this.powerUpActivity === 1) {
            return true;
        }
        return false;
    }
    spawnPowerUps() {
        if (this.checkIfPowerUpActive() === false && this.checkForPowerUps() === false) {
        }
    }
}
//# sourceMappingURL=PowerUps.js.map