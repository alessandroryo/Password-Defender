import TileObjects from './TileObjects.js';
import Game from './Game.js';

export default class WallTile extends TileObjects {
  /**
   * Construct wall tile class
   */
  constructor() {
    super('./assets/img/Wall.png');
  }

  // public setWallIcon(wallIcon: string): void {
  //   this.img = Game.loadNewImage(wallIcon);
  // }
}
