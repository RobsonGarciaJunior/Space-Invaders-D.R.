// Seleccionar los elementos del DOM
const consoleOutput = document.getElementById("console");
// const player = document.getElementById("movable-object");
const gameArea = document.getElementById("game-area");
const player = new Player(gameArea);
// Suscribirse a los cambios en el enemigo para actualizar su DOM
player.subscribe((data) => {
  if (data.isAlive === false) return; // Si el enemigo está muerto, no hacer nada
  player.domElement.style.left = data.x + "px";
  player.domElement.style.top = data.y + "px";
  player.domElement.style.transform = data.rotation;
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

// Función para manejar el Game Over
function gameOver() {
  logToConsole("¡Game Over! Has chocado con un enemigo.");
  clearInterval(gameLoop); // Detener el bucle del juego
}

window.addEventListener("keyup", (event) => {
  const key = event.key;
  if (key === "Escape") {
    clearInterval(gameLoop);
    window.location.href = "../INDEX/index.html"; // Redirigir al index.html
  }
});

// function mostrarModal(mensaje, onConfirm) {
//   const modal = document.getElementById("modal");
//   const modalContent = document.getElementById("modalContent");
//   const confirmButton = document.getElementById("confirmButton");

//   modalContent.innerHTML = mensaje;
//   confirmButton.style.display = onConfirm ? "inline-block" : "none";
//   modal.style.display = "block";

//   if (onConfirm) {
//     confirmButton.onclick = onConfirm;
//   }
// }

// function cerrarModal() {
//   const modal = document.getElementById("modal");
//   modal.style.display = "none";
// }

// Bucle del juego: mover el jugador, enemigos y misiles cada 10ms
const gameLoop = setInterval(() => {
  movePlayer(); // Mover el jugador
  moveEnemies(); // Mover enemigos
  // moveMissiles(enemies); // Pasar el array de enemigos a la función de misiles
}, 10);
// Función para crear enemigos en intervalos
function spawnEnemies() {
  // Generar 3 enemigos faciles inicialmente
  for (let i = 0; i < 3; i++) {
    let enemy = new Enemy(gameArea, "easy");

    // Suscribirse a los cambios en el enemigo para actualizar su DOM
    enemy.subscribe((data) => {
      if (data.isAlive === false) return; // Si el enemigo está muerto, no hacer nada
      enemy.domElement.style.left = data.x + "px";
      enemy.domElement.style.top = data.y + "px";
    });
    enemies.push(enemy);
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
