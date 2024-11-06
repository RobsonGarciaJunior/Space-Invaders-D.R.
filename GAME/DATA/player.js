//Player.js

class Player extends Observable {
  constructor(gameArea) {
    super();
    this.x = 0;
    this.y = 0;
    this.speed = 15;
    this.isAlive = true;
    this.gameArea = gameArea;
    this.rotation = 0;
    this.domElement = this.createPlayer(gameArea);
  }

  createPlayer(gameArea) {
    const player = document.createElement("div");
    player.id = "player";
    player.classList.add("player");
    gameArea.appendChild(player);
    return player;
  }

  // Método para mover el jugador y notificar el cambio
  move(direction) {
    switch (direction) {
      case "right":
        if (this.x < this.gameArea.offsetWidth - 50) {
          this.x += this.speed;
          this.rotation = "rotate(90deg)";
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.speed;
          this.rotation = "rotate(-0.25turn)";
        }
        break;
      case "up":
        if (this.y > 0) {
          this.y -= this.speed;
          this.rotation = "rotate(0)";
        }
        break;
      case "down":
        if (this.y < this.gameArea.offsetHeight - 50) {
          this.y += this.speed;
          this.rotation = "rotate(3.142rad)";
        }
        break;
    }
    // Notificar a los observadores el cambio de posición
    this.notify({ x: this.x, y: this.y });

    this.notify({ rotation: this.rotation });
  }

  hit() {
    isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
