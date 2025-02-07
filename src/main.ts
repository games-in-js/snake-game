import "./style.css";

import { CANVAS_SIZE, CELL_SIZE, GRID_SIZE } from "./constants";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.drawGrid();
  }

  drawGrid() {
    this.ctx.fillStyle = "#2c3e50";
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    this.ctx.strokeStyle = "#ffffff33";
    this.ctx.lineWidth = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(i * CELL_SIZE, 0);
      this.ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      this.ctx.stroke();

      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * CELL_SIZE);
      this.ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      this.ctx.stroke();
    }
  }
}

window.onload = () => new Game();
