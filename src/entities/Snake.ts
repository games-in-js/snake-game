type Position = {
  x: number;
  y: number;
};

export class Snake {
  body: Array<Position>;
  direction: Position;
  nextDirection: Position;

  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  move() {
    const newHead = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y,
    };
    // moveu a cabeça
    this.body.unshift(newHead);
    // remover o rabo
    this.body.pop();
  }

  checkCollisions(gridSize: number) {
    const nextHead = {
      x: this.body[0].x + this.nextDirection.x,
      y: this.body[0].y + this.nextDirection.y,
    };

    const hitWall =
      nextHead.x >= gridSize ||
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.y >= gridSize;

    return hitWall;
  }

  draw(ctx: CanvasRenderingContext2D, cellSize: number) {
    ctx.fillStyle = "#4CAF50";
    this.body.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize
      );
    });
  }
}
