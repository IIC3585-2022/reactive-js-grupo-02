import { of } from "rxjs";
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

  map = of([
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
  ]);

  draw(ctx) {
    for(let row = 0; row < this.map.length; row++) {
      for(let col = 0; col < this.map[row].length; col++) {
        if(this.map[row][col] === 1) {
          this.#drawImage(this.wall, col * this.tileSize, row * this.tileSize, ctx);
        } else if(this.map[row][col] === 0) {
          this.#drawImage(this.yellowDot, col * this.tileSize, row * this.tileSize, ctx);
        }

      }
    }
    // this.map.subscribe(row => {
    //   const cols = of(row);
    //   cols.subscribe(col => {
    //     if(col === 1) {
    //       this.#drawImage(this.wall, col * this.tileSize, row * this.tileSize, ctx);
    //     } else if(col === 0) {
    //       this.#drawImage(this.yellowDot, col * this.tileSize, row * this.tileSize, ctx);
    //     }
    //   });
    // })
  }

  #drawImage(img, x, y, ctx) {
    ctx.drawImage(img, x, y, this.tileSize, this.tileSize);
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }
}