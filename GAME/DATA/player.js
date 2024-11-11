//Player.js

class Player extends Observable {
  constructor(gameArea) {
    super();
    this.x = 0;
    this.y = 0;
    this.speed = 8;
    this.isAlive = true;
    this.gameArea = gameArea;
    this.rotation = 0;
    this.domElement = this.createPlayer(gameArea);
  }

  createPlayer() {
    const player = document.createElement("div");
    player.id = "player";
    player.classList.add("player");
    // Colocar al enemigo en la esquina superior derecha
    //en la parte inferior
    //en el medio de la pantalla
    this.x = this.gameArea.offsetWidth / 2 - 50; // Centro horizontal
    this.y = this.gameArea.offsetHeight - 100; // 100px from the bottom

    player.style.position = "absolute"; // Asegurarse de que esté posicionado absolutamente
    player.style.left = this.x + "px";
    player.style.top = this.y + "px";
    player.style.zIndex = "7"; // Asegura que el jugador se muestre encima

    this.gameArea.appendChild(player);
    return player;
  }

  move(direction) {
    // Remove any previous rotation classes to avoid conflicts
    this.domElement.classList.remove(
      "rotateRight",
      "rotateLeft",
      "rotateUp",
      "rotateDown"
    );

    switch (direction) {
      case "right":
        if (this.x < this.gameArea.offsetWidth - 50) {
          this.x += this.speed;
          this.domElement.classList.add("rotateRight"); // Apply rotation to domElement
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.speed;
          this.domElement.classList.add("rotateLeft"); // Apply rotation to domElement
        }
        break;
      case "up":
        if (this.y > 0) {
          this.y -= this.speed;
          this.domElement.classList.add("rotateUp"); // Apply rotation to domElement
        }
        break;
      case "down":
        if (this.y < this.gameArea.offsetHeight - 50) {
          this.y += this.speed;
          this.domElement.classList.add("rotateDown"); // Apply rotation to domElement
        }
        break;
    }
    this.notify({ x: this.x, y: this.y, isAlive: this.isAlive });
  }

  rotateToMouse(mouseX, mouseY) {
    // Calcular el centro del jugador para una rotación precisa
    const centerX = this.x + this.domElement.offsetWidth / 2;
    const centerY = this.y + this.domElement.offsetHeight / 2;

    // Calcular el ángulo entre el centro del jugador y la posición del toque o ratón
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const angle = Math.atan2(deltaY, deltaX); // Calcular el ángulo en radianes
    const rotationAngle = (angle * 180) / Math.PI + 90; // Convertir a grados y ajustar (corrección de rotación)

    // Actualizar solo si la rotación ha cambiado, para evitar actualizaciones innecesarias
    if (this.rotation !== rotationAngle) {
      this.rotation = rotationAngle;
      this.domElement.style.transform = `rotate(${this.rotation}deg)`; // Actualizar la rotación en el DOM
      this.notify({ rotation: this.rotation });
    }
  }

  hit() {
    isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
