import MovingDirection from "./MovingDirection";

export default class Pacman{
  constructor(x, y, tileSize, velocity, tileMap){
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.#loadPacmanImages();
  }

  draw(ctx) {
    console.log(this.pacmanImages[this.pacmanImageIndex])
    ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize);
  }

  #loadPacmanImages(){
    const pacmanImg1 = new Image();
    pacmanImg1.src = "../img/pac0.png";

    const pacmanImg2 = new Image();
    pacmanImg2.src = "../img/pac1.png";

    const pacmanImg3 = new Image();
    pacmanImg3.src = "../img/pac2.png";

    const pacmanImg4 = new Image();
    pacmanImg4.src = "../img/pac1.png";

    this.pacmanImages = [
      pacmanImg1,
      pacmanImg2,
      pacmanImg3,
      pacmanImg4
    ];

    this.pacmanImageIndex = 0;
  }
} 