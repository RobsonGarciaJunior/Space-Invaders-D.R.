let isShooting = false; // Estado de disparo
let lastShotTime = 0; // Tiempo del último disparo
let shootInterval;
let mouseX = 0;
let mouseY = 0;

// Función para iniciar el disparo continuo
function startShooting(x, y) {
  isShooting = true;
  mouseX = x;
  mouseY = y;

  shootInterval = setInterval(() => {
    const currentTime = Date.now();
    if (currentTime - lastShotTime >= 600) {
      // 300 ms = 0.3 segundos
      fireMissile(mouseX, mouseY); // Usar la posición actual del ratón o toque
      lastShotTime = currentTime;
    }
  }, 10);
}

// Función para detener el disparo
function stopShooting() {
  isShooting = false;
  clearInterval(shootInterval);
}

// Escuchar `mousedown` y `touchstart` para iniciar el disparo
gameArea.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    // Botón izquierdo del ratón
    startShooting(event.clientX, event.clientY);
  }
});

gameArea.addEventListener("touchstart", (event) => {
  const touch = event.touches[0];
  startShooting(touch.clientX, touch.clientY);
});

// Escuchar `mouseup` y `touchend` para detener el disparo
gameArea.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    stopShooting();
  }
});

gameArea.addEventListener("touchend", () => {
  stopShooting();
});

// Escuchar el movimiento para actualizar la posición en tiempo real
gameArea.addEventListener("mousemove", (event) => {
  if (isShooting) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
});

gameArea.addEventListener("touchmove", (event) => {
  if (isShooting) {
    const touch = event.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
  }
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
