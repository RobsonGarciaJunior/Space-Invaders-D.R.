// Detectar clic del ratón para disparar
gameArea.addEventListener("click", (event) => {
    fireMissile(event.clientX, event.clientY);
});


// Función para disparar un misil hacia la posición del ratón
function fireMissile(mouseX, mouseY) {

    //SERIA MAS CORRECTO HACERLO ASI?
    // player.fire(mouseX, mouseY);

    //Creamos el objeto bala que dispara el usuario pasandole la posicion del usuario
    //Hacia donde debe rotar
    //Y la posicion de hacia donde apunta el raton en el momento del disparo
    const missile = new Missile(player.x, player.y, mouseX, mouseY, this.rotation, gameArea);

    // gameArea.appendChild(missile.domElement);

    // Suscribirse a los cambios en la bala para actualizar su DOM
    missile.subscribe((data) => {
        if (data.isAlive === false) return; // Si el enemigo está muerto, no hacer nada
        missile.domElement.style.left = data.x + "px";  // Usamos x para la posición horizontal
        missile.domElement.style.top = data.y + "px";
    });

    // Guardar la información del misil
    missiles.push(missile);
}

// Función para mover los misiles
function moveMissiles(enemies) {
    missiles.forEach((missile) => {

        missile.move();
        // Comprobar si el misil sale del área de juego
        if (
            parseInt(missile.domElement.style.left) < 0 ||
            parseInt(missile.domElement.style.left) > gameArea.offsetWidth ||
            parseInt(missile.domElement.style.top) < 0 ||
            parseInt(missile.domElement.style.top) > gameArea.offsetHeight
        ) {
            // Si sale del área, eliminar el misil
            missile.domElement.remove();
            missiles.splice(index, 1);
        } else {
            // Comprobar colisiones con enemigos
            enemies.forEach((enemy, enemyIndex) => {
                if (checkCollision(missile.domElement, enemy.domElement)) {
                    // Eliminar el misil y el enemigo
                    missile.domElement.remove();
                    enemies.splice(enemyIndex, 1);
                    enemy.hit();
                    missiles.splice(index, 1);

                    // Aumentar la puntuación
                    score += 10;
                    logToConsole(`Puntos: ${score}`);

                    // Crear nuevo enemigo después de matar uno
                    enemy.createEnemy();
                }
            });
        }
    });
}