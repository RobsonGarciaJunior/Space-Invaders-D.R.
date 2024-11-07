gameArea.addEventListener("click", (event) => {
  fireMissile(event.clientX, event.clientY);
});

// Función para disparar un misil hacia la posición del ratón
function fireMissile(mouseX, mouseY) {
  //Creamos el objeto bala que dispara el usuario pasandole la posicion del usuario
  //Hacia donde debe rotar
  //Y la posicion de hacia donde apunta el raton en el momento del disparo
  const missile = new Missile(
    player.x,
    player.y,
    mouseX,
    mouseY,
    gameArea,
    player.rotation
  );

  // Suscribirse a los cambios en la bala para actualizar su DOM
  missile.subscribe((data) => {
    if (data.isAlive === false) {
      missiles.splice(missiles.indexOf(missile), 1);
    } else {
      // Si el enemigo está muerto, no hacer nada
      missile.domElement.style.left = data.x + "px";
      missile.domElement.style.top = data.y + "px";
    }
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
      missile.destroy();
    } else {
      // Comprobar colisiones con enemigos
      enemies.forEach((enemy) => {
        if (checkCollision(missile.domElement, enemy.domElement)) {
          // Eliminar el misil y el enemigo
          missile.destroy();
          enemy.hit();

          // Aumentar la puntuación
          score += 10;
          document.getElementById("score-display").innerHTML =
            "Puntos: " + score;
        }
      });
    }
  });
}
