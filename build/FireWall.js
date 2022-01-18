import PowerUps from './PowerUps.js';
export default class FireWall extends PowerUps {
    constructor(gameMap) {
        super();
        this.gameMap = gameMap;
    }
    setFireWall() {
        setTimeout(() => {
            this.gameMap.setGameMap(8, 18, 43);
            this.gameMap.setGameMap(8, 21, 43);
        }, 500);
    }
    clearFireWall() {
        setTimeout(() => {
            this.gameMap.setGameMap(8, 18, 5);
            this.gameMap.setGameMap(8, 21, 5);
        }, 5000);
    }
}
//# sourceMappingURL=FireWall.js.map