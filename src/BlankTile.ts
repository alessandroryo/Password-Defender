import TileObjects from './TileObjects.js';

export default class BlankTile extends TileObjects {
  /**
   * Construct wall tile class
   */
  constructor() {
    super('./assets/img/BlankDot.png');
  }
}
