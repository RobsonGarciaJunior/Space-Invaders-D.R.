//Enemy.js
class Enemy extends Observable {
  constructor(gameArea, enemyType) {
    super();
    this.gameArea = gameArea;
    this.enemyType = enemyType;
    this.isAlive = true;
    this.speed = 0;
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
        this.speed = 3;
        break;
      case "medium":
        enemy.classList.add("enemy-medium");
        this.speed = 5;
        break;
      case "hard":
        enemy.classList.add("enemy-hard");
        this.speed = 2;
        break;
    }

    // // Colocar al enemigo en la esquina superior derecha
    // // this.x = this.gameArea.offsetWidth;
    // this.y = 0; // Siempre en la parte superior

    // Obtener las coordenadas de la nave nodriza
    const mothership = document.getElementById("mothership");
    const mothershipRect = mothership.getBoundingClientRect();

    // Colocar el enemigo en una posición aleatoria dentro de la nave nodriza
    this.x = mothershipRect.left + Math.random() * mothershipRect.width;
    this.y = mothershipRect.top + Math.random() * mothershipRect.height;
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
