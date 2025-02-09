import { CELL_SIZE, GRID_SIZE, SPRITE_SIZE, SPRITES } from "../constants";

type Position = {
  x: number;
  y: number;
};

export class Food {
  position: Position;

  constructor() {
    this.position = this.getRandomPosition();
  }

  getPosition() {
    return this.position;
  }

  getRandomPosition(): Position {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  respawn() {
    this.position = this.getRandomPosition();
  }

  draw(ctx: CanvasRenderingContext2D, spriteSheet: HTMLImageElement) {
    const appleCoords = SPRITES.apple;
    ctx.drawImage(
      spriteSheet,
      appleCoords.x,
      appleCoords.y,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position.x * CELL_SIZE,
      this.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
  }
}
