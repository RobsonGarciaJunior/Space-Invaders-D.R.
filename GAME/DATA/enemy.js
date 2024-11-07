//Enemy.js
class Enemy extends Observable {
  constructor(gameArea, enemyType) {
    super();
    this.gameArea = gameArea;
    this.enemyType = enemyType;
    this.isAlive = true;
    this.speed = 2;
    this.x = 0;
    this.y = 0;
    this.domElement = this.createEnemy();
  }

  move() {
    this.y += this.speed;
  }

  createEnemy() {
    // Función para crear un enemigo en una posición aleatoria
    const enemy = document.createElement("div");
    switch (this.enemyType) {
      case "easy":
        enemy.classList.add("enemy-easy");
        enemy.speed = 2;
        break;
      case "medium":
        enemy.classList.add("enemy-medium");
        enemy.speed = 2;
        break;
      case "hard":
        enemy.classList.add("enemy-hard");
        enemy.speed = 2;
        break;
    }
    

    // Colocar al enemigo en la esquina superior derecha
    // this.x = this.gameArea.offsetWidth;
    this.y = 0; // Siempre en la parte superior

    enemy.style.position = "absolute"; // Asegurarse de que esté posicionado absolutamente
    enemy.style.left = this.x + "px";
    enemy.style.top = this.y + "px";

    this.gameArea.appendChild(enemy);
    return enemy;
  }

  // Método para mover el enemigo y notificar el cambio
  move(enemyX, enemyY) {
    if (this.x < enemyX) this.x += this.speed;
    if (this.x > enemyX) this.x -= this.speed;
    if (this.y < enemyY) this.y += this.speed;
    if (this.y > enemyY) this.y -= this.speed;

    // Notificar a los observadores el cambio de posición
    this.notify({ x: this.x, y: this.y });
  }

  hit() {
    if (!this.isAlive) return; // Prevenir múltiples llamadas
    this.isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
