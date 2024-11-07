class Missile extends Observable {
    constructor(playerX, playerY, mouseX, mouseY, rotation, gameArea) {
        super();
        this.velocity = 10;
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        this.rotation = rotation;
        this.missileStartX = 0;
        this.missileStartY = 0;
        this.angle = 0;
        this.gameArea = gameArea;
        this.domElement = this.createMissile(playerX, playerY, rotation);
    }

    createMissile(playerX, playerY, rotation) {
        const missile = document.createElement('div');
        missile.classList.add("missile");

        // Cálculo de la posición inicial del misil en el centro del jugador
        this.missileStartX = playerX.left + 50 / 2 - 5; // Ajustamos la posición en X
        this.missileStartY = playerY.top + 50 / 2 - 5; // Ajustamos la posición en Y
        missile.style.top = this.missileStartY + "px";
        missile.style.left = this.missileStartX + "px";
        missile.style.transform = `rotate(${rotation}deg)`;
        this.gameArea.appendChild(missile);
        return missile;
    }

    move() {
        // Calcular la dirección del misil desde la posición del jugador hacia el clic del ratón
        const deltaX = this.mouseX - this.missileStartX; // Cambiar el origen a missileStartX
        const deltaY = this.mouseY - this.missileStartY; // Cambiar el origen a missileStartY

        this.angle = Math.atan2(deltaY, deltaX); // Calcular el ángulo de dirección

        const missileSpeedX = Math.cos(this.angle) * this.velocity;
        const missileSpeedY = Math.sin(this.angle) * this.velocity;
        // Actualizamos las posiciones actuales del misil
        this.missileStartX += missileSpeedX;
        this.missileStartY += missileSpeedY;
        // Actualizar la posición del misil en la pantalla
        this.domElement.style.top += (this.missileStartY + missileSpeedY) + "px";
        this.domElement.style.left += (this.missileStartX + missileSpeedX) + "px";

        this.notify({
            x: this.missileStartX,
            y: this.missileStartY,
            isAlive: true
        });

    }
}