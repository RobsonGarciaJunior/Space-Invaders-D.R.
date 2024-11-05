//Enemy.js
export class Enemy {
  constructor(gameArea) {
    this.createEnemy(gameArea, enemyType);
  }

  move() {
    this.y += this.speed;
  }

  hit() {
    this.isAlive = false;
  }

  createEnemy(gameArea, enemyType) {
    // Función para crear un enemigo en una posición aleatoria
    // this.movementSpeed = movementSpeed;

    const enemy = document.createElement("div");
    switch (enemyType) {
      case "easy":
        enemy.movementSpeed = 5;
        enemy.classList.add("enemy-easy");
        enemy.style.top =
          Math.floor(Math.random() * (gameArea.offsetHeight - 30)) + "px";
        enemy.style.left =
          Math.floor(Math.random() * (gameArea.offsetWidth - 30)) + "px";
        enemy.speed = 2;
        break;
      case "medium":
        enemy.movementSpeed = 5;
        enemy.classList.add("enemy-medium");
        enemy.style.top =
          Math.floor(Math.random() * (gameArea.offsetHeight - 30)) + "px";
        enemy.style.left =
          Math.floor(Math.random() * (gameArea.offsetWidth - 30)) + "px";
        enemy.speed = 2;
        break;
      case "hard":
        enemy.movementSpeed = 5;
        enemy.classList.add("enemy-hard");
        enemy.style.top =
          Math.floor(Math.random() * (gameArea.offsetHeight - 30)) + "px";
        enemy.style.left =
          Math.floor(Math.random() * (gameArea.offsetWidth - 30)) + "px";
        enemy.speed = 2;
        break;
    }
  }
}
