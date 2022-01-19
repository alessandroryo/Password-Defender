import PowerUps from './PowerUps.js';
export default class VPN extends PowerUps {
    constructor(player, gameMap) {
        super();
        this.gameMap = gameMap;
        this.player = player;
    }
    setTransparentPlayer() {
        setTimeout(() => {
            this.player.setPlayerIndex(1);
        }, 100);
    }
    clearTransparentPlayer() {
        setTimeout(() => {
            this.player.setPlayerIndex(0);
        }, 5000);
    }
}
//# sourceMappingURL=VPN.js.map