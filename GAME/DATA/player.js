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
    this.gameArea.appendChild(player);
    return player;
  }

  move(direction) {
    // Remove any previous rotation classes to avoid conflicts
    this.domElement.classList.remove("rotateRight", "rotateLeft", "rotateUp", "rotateDown");

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

  // fire(mouseX, mouseY) {
  //   //Creamos el objeto bala que dispara el usuario pasandole la posicion del usuario
  //   //Hacia donde debe rotar
  //   //Y la posicion de hacia donde apunta el raton en el momento del disparo
  //   const bullet = new Missile(this.x, this.y, this.rotation, mouseX, mouseY);

  //   this.gameArea.appendChild(bullet.domElement);

  //   // Suscribirse a los cambios en la bala para actualizar su DOM
  //   bullet.subscribe((data) => {
  //     if (data.isAlive === false) return; // Si el enemigo está muerto, no hacer nada
  //     bullet.domElement.style.left = data.x + "px";
  //     bullet.domElement.style.top = data.y + "px";
  //   });
  // }

  hit() {
    isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
