class Missile extends Observable {
  constructor(playerX, playerY, mouseX, mouseY, gameArea, rotation) {
    super();
    this.velocity = 10;
    this.gameArea = gameArea;
    this.rotation = rotation;
    // Posición inicial del misil (centro del jugador)
    this.x = playerX + 25; // Ajuste del centro del jugador
    this.y = playerY + 25; // Ajuste del centro del jugador

    // Calcular el ángulo hacia el que debe moverse el misil
    const deltaX = mouseX - this.x;
    const deltaY = mouseY - this.y;
    this.angle = Math.atan2(deltaY, deltaX);

    // Convertir el ángulo de radianes a grados para la rotación CSS
    this.rotationAngle = (this.angle * 180) / Math.PI + 90; // 90 grados de ajuste por la orientación del misil

    // Asegurarnos que el valor esté en el rango de 0 a 360 grados
    if (this.rotationAngle < 0) {
      this.rotationAngle += 360;
    }

    // Crear el elemento DOM del misil
    this.domElement = this.createMissile();
    this.isAlive = true; // Indica si el misil sigue activo
  }

  createMissile() {
    const missile = document.createElement("div");
    missile.classList.add("missile");
    missile.style.left = `${this.x}px`;
    missile.style.top = `${this.y}px`;
    missile.style.transform = `rotate(${this.rotationAngle}deg)`; // Aplicamos la rotación inicial al misil
    this.gameArea.appendChild(missile);
    return missile;
  }

  move() {
    // Calcular el siguiente paso basado en el ángulo y la velocidad
    this.x += Math.cos(this.angle) * this.velocity;
    this.y += Math.sin(this.angle) * this.velocity;

    // Notificar la nueva posición
    this.notify({
      x: this.x,
      y: this.y,
    });
  }

  destroy() {
    if (!this.isAlive) return; // Prevenir múltiples llamadas
    this.isAlive = false;
    this.domElement.remove();
    this.notify({ isAlive: this.isAlive });
  }
}
