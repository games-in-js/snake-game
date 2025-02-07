import "./style.css";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;

    this.ctx.fillStyle = "rgb(200 0 0)";
    this.ctx.fillRect(10, 10, 50, 50);

    this.ctx.fillStyle = "rgb(0 0 200 / 50%)";
    this.ctx.fillRect(30, 30, 50, 50);
  }
}

window.onload = () => new Game();
