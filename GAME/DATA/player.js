//Player.js

export class Player {
  constructor(canvas, sprite, x, y) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.movementSpeed = 15;
  }

  draw() {
    this.context.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  moveRight() {
    const left = parseInt(window.getComputedStyle(movableObject).left);
    if (left < gameArea.offsetWidth - 50) {
      movableObject.style.left = left + movementSpeed + "px";
    }
  }

  moveLeft() {
    const left = parseInt(window.getComputedStyle(movableObject).left);
    if (left > 0) {
      movableObject.style.left = left - movementSpeed + "px";
    }
  }

  moveUp() {
    const top = parseInt(window.getComputedStyle(movableObject).top);
    if (top > 0) {
      movableObject.style.top = top - movementSpeed + "px";
    }
  }

  moveDown() {
    const top = parseInt(window.getComputedStyle(movableObject).top);
    if (top < gameArea.offsetHeight - 50) {
      movableObject.style.top = top + movementSpeed + "px";
    }
  }
}
