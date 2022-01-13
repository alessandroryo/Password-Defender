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
    player;
    constructor() {
        this.spawnTimerDefault = 20;
        this.spawnTimer = this.spawnTimerDefault;
        this.activeMap = 0;
        this.powerUpActivity = 0;
    }
    draw(ctx) {
        ctx.drawImage(Game.loadNewImage('./assets/img/Random-Box.png'), this.x + 300, this.y + 200, this.tileSize, this.tileSize);
    }
    getXPos() {
        return this.x;
    }
    getYPos() {
        return this.y;
    }
}
//# sourceMappingURL=PowerUps.js.map