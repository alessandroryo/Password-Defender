import TileObjects from './TileObjects.js';
import Game from './Game.js';
export default class WallTile extends TileObjects {
    constructor() {
        super('./assets/img/Wall.png');
    }
    setWallIcon(wallIcon) {
        this.img = Game.loadNewImage(wallIcon);
    }
}
//# sourceMappingURL=WallTile.js.map