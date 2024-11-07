// Seleccionar los elementos del DOM
const consoleOutput = document.getElementById("console");
// const player = document.getElementById("movable-object");
const gameArea = document.getElementById("game-area");
const player = new Player(gameArea);
// Suscribirse a los cambios en el jugador para actualizar su DOM
player.subscribe((data) => {
  if (data.isAlive === false) return; // Si el enemigo está muerto, no hacer nada
  player.domElement.style.left = data.x + "px";
  player.domElement.style.top = data.y + "px";
});

// Inicializar enemigos y configurar el juego
let enemies = [];
let missiles = [];

// Función para registrar los mensajes en la consola del juego
function logToConsole(message) {
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  consoleOutput.appendChild(newMessage);
  // If the console content exceeds the visible area, remove the oldest line
  while (consoleOutput.scrollHeight > consoleOutput.clientHeight) {
    consoleOutput.removeChild(consoleOutput.firstChild);
  }
  // consoleOutput.scrollTop = consoleOutput.scrollHeight; // Mantener el scroll al final
}

//Variable encargada de controlar el juego por si se pausa o reanuda
let gameLoop;

// Función para manejar el Game Over
function gameOver() {
  // logToConsole("¡Game Over! Has chocado con un enemigo.");
  clearInterval(gameLoop); // Detener el bucle del juego
  mostrarModal(
    "¡Game Over! Has chocado con un enemigo.",
    confirmarReinicio,
    true
  );
}

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
      moveMissiles(enemies);
    }
  }, 10);
}

// Función de confirmación para salir del juego
function confirmarSalida() {
  window.location.href = "../INDEX/index.html"; // Redirigir al index.html
}

// Función para mostrar el modal con mensaje personalizado
function mostrarModal(mensaje, onConfirm, esGameOver = false) {
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modalContent");
  const confirmButton = document.getElementById("confirmButton");
  const cancelButton = document.getElementById("cancelButton");

  modalContent.querySelector("p").textContent = mensaje;
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

// FIN PAUSAR JUEGO CON MODAL

// Función para crear enemigos en intervalos
function spawnEnemies() {
  // Generar 3 enemigos fáciles con un intervalo de 1 segundo entre cada uno
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      let enemy = new Enemy(gameArea, "easy");

      // Suscribirse a los cambios en el enemigo para actualizar su DOM
      enemy.subscribe((data) => {
        if (data.isAlive === false) {
          // Si el enemigo está muerto, eliminarlo de la lista de enemigos
          enemies.splice(enemies.indexOf(enemy), 1);
        } else {
          enemy.domElement.style.left = data.x + "px";
          enemy.domElement.style.top = data.y + "px";
        }
      });

      enemies.push(enemy);
    }, i * 1000); // 1000 ms de intervalo entre cada creación
  }
}

// Generar un enemigo inicialmente
spawnEnemies();
// Generar enemigos cada 5 segundos
setInterval(spawnEnemies, 5000);

// Mensaje inicial en la consola
logToConsole(
  "Usa W, A, S, D para mover el objeto y haz clic para disparar misiles."
);
