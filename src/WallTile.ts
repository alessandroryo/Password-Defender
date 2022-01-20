import TileObjects from './TileObjects.js';

export default class WallTile extends TileObjects {
  /**
   * Construct Wall tile class
   */
  constructor() {
    super(localStorage.getItem('wallSkinSrc'));
  }
}
