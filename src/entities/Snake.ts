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

  getHead() {
    return this.body[0];
  }

  removeTail() {
    this.body.pop();
  }

  move() {
    this.direction = this.nextDirection;
    const newHead = {
      x: this.getHead().x + this.direction.x,
      y: this.getHead().y + this.direction.y,
    };
    // moveu a cabeça
    this.body.unshift(newHead);
  }

  changeDirection(newDir: Position) {
    const isOpposite =
      (newDir.x !== 0 && this.direction.x === -newDir.x) ||
      (newDir.y !== 0 && this.direction.y === -newDir.y);

    if (!isOpposite) {
      this.nextDirection = newDir;
    }
  }

  checkCollisions(gridSize: number) {
    const nextHead = {
      x: this.getHead().x + this.nextDirection.x,
      y: this.getHead().y + this.nextDirection.y,
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
