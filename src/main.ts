import "./style.css";

import { CANVAS_SIZE, CELL_SIZE, GRID_SIZE } from "./constants";
import { Snake } from "./entities/Snake";
import { Food } from "./entities/Food";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  snake = new Snake();
  food = new Food();

  constructor() {
    this.canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.startGameLoop();
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

  draw() {
    this.drawGrid();

    this.snake.draw(this.ctx, CELL_SIZE);

    this.food.draw(this.ctx, CELL_SIZE);
  }

  update() {
    this.draw();

    if (this.snake.checkCollisions(GRID_SIZE)) {
      return;
    }

    this.snake.move();
  }

  startGameLoop() {
    setInterval(() => this.update(), 100);
  }
}

window.onload = () => new Game();
