import { CELL_SIZE, SPRITE_SIZE, SPRITES } from "../constants";

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

    const hitSelf = this.body.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y
    );

    return hitWall || hitSelf;
  }

  getSegmentSprite(index: number) {
    const prev = this.body[index - 1];
    const current = this.body[index];
    const next = this.body[index + 1];

    // head
    if (index === 0) {
      if (this.direction.x === 1) return "head_right";
      if (this.direction.x === -1) return "head_left";
      if (this.direction.y === 1) return "head_down";
      return "head_up";
    }

    // tail
    if (index === this.body.length - 1) {
      if (prev.x > current.x) return "tail_left";
      if (prev.x < current.x) return "tail_right";
      if (prev.y > current.y) return "tail_up";
      return "tail_down";
    }

    // straight body parts
    if (prev.x === next.x) return "body_vertical";
    if (prev.y === next.y) return "body_horizontal";

    // right to up
    if (prev.x < current.x && next.y < current.y) return "body_topleft";
    // down to left
    if (prev.y < current.y && next.x < current.x) return "body_topleft";
    // left to up
    if (prev.x > current.x && next.y < current.y) return "body_topright";
    // down to right
    if (prev.y < current.y && next.x > current.x) return "body_topright";
    // left to down
    if (prev.x > current.x && next.y > current.y) return "body_bottomright";
    // up to right
    if (prev.y > current.y && next.x > current.x) return "body_bottomright";
    // right to down
    if (prev.x < current.x && next.y > current.y) return "body_bottomleft";
    // up to left
    if (prev.y > current.y && next.x < current.x) return "body_bottomleft";

    return "body_horizontal";
  }

  draw(ctx: CanvasRenderingContext2D, spriteSheet: HTMLImageElement) {
    this.body.forEach((segment, index) => {
      const spriteType = this.getSegmentSprite(index);
      const spriteCoords = SPRITES[spriteType];

      ctx.drawImage(
        spriteSheet,
        spriteCoords.x,
        spriteCoords.y,
        SPRITE_SIZE,
        SPRITE_SIZE,
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  }
}
