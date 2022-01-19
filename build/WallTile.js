import TileObjects from './TileObjects.js';
export default class WallTile extends TileObjects {
    constructor() {
        super(localStorage.getItem('wallSkinSrc'));
    }
}
//# sourceMappingURL=WallTile.js.map