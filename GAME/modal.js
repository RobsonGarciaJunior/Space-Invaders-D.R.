//PAUSAR JUEGO CON MODAL
// Variable para controlar el estado de pausa
let isGamePaused = false;
let lastPlayerPosition = { x: 0, y: 0 }; // Guardamos la última posición conocida del jugador

// Escuchar el evento `keyup` para pausar el juego
window.addEventListener("keyup", (event) => {
  const key = event.key;
  if (key === "Escape") {
    if (isGamePaused) {
      cerrarModal();
      reanudarJuego();
    } else {
      pausarJuego();
      mostrarModal(
        "Usa W, A, S, D para mover el objeto y haz clic para disparar misiles."
        + "<br>" + "<br>"
        +
        "¿Está seguro de que desea salir del juego?",
        confirmarSalida,
        false
      );
    }
  }
});

// Función para pausar el juego
function pausarJuego() {
  clearInterval(gameLoop); // Detener el bucle del juego
  isGamePaused = true;
  lastPlayerPosition = {
    x: player.x, // Asumimos que `player.x` y `player.y` son las posiciones del jugador
    y: player.y,
  };
}

// Función para reanudar el juego
function reanudarJuego() {
  isGamePaused = false;
  gameLoop = setInterval(() => {
    if (!isGamePaused) {
      movePlayer(); // Mover el jugador solo si el juego no está en pausa
      moveEnemies(); // Mover enemigos solo si el juego no está en pausa
      moveMissiles(enemies)
    }
  }, 10);
}

// Función de confirmación para salir del juego
function confirmarSalida() {
  actualizarPuntuacion();
  window.location.href = "../INDEX/index.html"; // Redirigir al index.html
}

// Función para mostrar el modal con mensaje personalizado
function mostrarModal(mensaje, onConfirm, esGameOver = false) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");

  modalContent.querySelector("p").innerHTML = mensaje;
  confirmButton.textContent = esGameOver ? "Reiniciar" : "Confirmar";
  cancelButton.textContent = esGameOver ? "Salir" : "Cancelar";

  confirmButton.onclick = onConfirm;
  cancelButton.onclick = () => {
    if (esGameOver) {
      confirmarSalida(); // Si es Game Over y elige salir, redirige
    } else {
      cerrarModal();
      reanudarJuego(); // Si elige cancelar, se reanuda el juego
    }
  };

  modal.style.display = "block";
}

//Funcion de reinicio de partida tras gameOver
function confirmarReinicio() {
  actualizarPuntuacion();
  location.reload(); // Recargar la página para reiniciar la partida
}

// Función para cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Bucle del juego: mover el jugador, enemigos y misiles cada 10ms
gameLoop = setInterval(() => {
  if (!isGamePaused) {
    movePlayer(); // Mover el jugador solo si el juego no está en pausa
    moveEnemies(); // Mover enemigos solo si el juego no está en pausa
    moveMissiles(enemies); // Pasar el array de enemigos a la función de misiles
  }
}, 10);

// Intervalo separado para generar enemigos cada 5 segundos (5000 milisegundos)
setInterval(() => {
  if (!isGamePaused) {
    spawnEnemies();
  }
}, 5000);

function actualizarPuntuacion() {
  //
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioActivo"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  if (usuarioLogueado) {
    if (usuarioLogueado.puntuacion < score) {
      usuarioLogueado.puntuacion = score;
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioLogueado));

      const usuarioMod = usuarios.find(
        (usuario) => (usuario.nombre = usuarioLogueado.nombre)
      );
      usuarioMod.puntuacion = score;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }
}

//Funciones para la animacion del movimiento del Joistick
function startMove(event) {
  event.preventDefault();
}

function moveJoystick(event) {
  event.preventDefault();

  const touch = event.touches[0];
  const rect = joystick.getBoundingClientRect();

  // Calcular posición dentro del área del joystick
  const x = touch.clientX - rect.left - rect.width / 2;
  const y = touch.clientY - rect.top - rect.height / 2;

  // Distancia y ángulo del toque en relación al centro del joystick
  const distance = Math.min(50, Math.sqrt(x * x + y * y));
  const angle = Math.atan2(y, x);

  // Actualiza la posición del mango del joystick
  joystickHandle.style.left = `${50 + distance * Math.cos(angle)}%`;
  joystickHandle.style.top = `${50 + distance * Math.sin(angle)}%`;

  // Guarda la dirección para el movimiento del jugador
  joystickDirection = { angle, distance };
}

function endMove() {
  joystickHandle.style.left = "50%";
  joystickHandle.style.top = "50%";
  joystickDirection = { angle: 0, distance: 0 }; // Reset de dirección
}
