import { from } from "rxjs";
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

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
}