import { from } from "rxjs";
import Pacman from './Pacman.js';
export default class TileMap {
  constructor(tileSize){
    this.tileSize = tileSize;
    this.yellowDot = new Image();
    this.yellowDot.src = "../img/yellowdot.png";

    this.wall = new Image();
    this.wall.src = "../img/wall.png";

    this.pac0 = new Image();
    this.pac0.src = "../img/pac0.png";
  }
// 1- wall
// 0 - dots
// 4 - pacman
  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];
  map_rxjs = from(this.map);

  draw(ctx) {
    let y = 0;
    this.map_rxjs.subscribe(row => {
      const cols = from(row);
      let x = 0;
      cols.subscribe(col => {
        if(col === 1) {
          this.#drawImage(this.wall, x * this.tileSize, y * this.tileSize, ctx);
        } else if(col === 0) {
          this.#drawImage(this.yellowDot, x * this.tileSize, y * this.tileSize, ctx);
        }
        x++;
      });
      y++;
    })
  }

  #drawImage(img, x, y, ctx) {
    ctx.drawImage(img, x, y, this.tileSize, this.tileSize);
  }

  getPacman(velocity) {
    let pacman = 0;
    let y = 0;
    this.map_rxjs.subscribe(row => {
      const cols = from(row);
      let x = 0;
      cols.subscribe(col => {
        if(col === 4) {
          this.map[y][x] = 0;
          pacman = new Pacman(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
        x++;
      });
      y++;
    })
    return pacman;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
}