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

  // // Método para rotar el jugador hacia el ratón (sin disparar)
  // rotateToMouse(mouseX, mouseY) {
  //   // Calcular el ángulo entre la posición del jugador y la posición del ratón
  //   const deltaX = mouseX - this.x;
  //   const deltaY = mouseY - this.y;
  //   const angle = Math.atan2(deltaY, deltaX); // Calcular el ángulo en radianes
  //   const rotationAngle = (angle * 180) / Math.PI + 90; // Convertir a grados y ajustar (corrección de rotación)

  //   // Aplicar la rotación al jugador
  //   this.rotation = rotationAngle;
  //   this.domElement.style.transform = `rotate(${this.rotation}deg)`; // Actualizar la rotación en el DOM

  //   // Notificar a los observadores que la rotación ha cambiado
  //   this.notify({ rotation: this.rotation });
  // }

  hit() {
    isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
