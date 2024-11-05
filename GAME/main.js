// Seleccionar los elementos del DOM
const consoleOutput = document.getElementById("console");
const movableObject = document.getElementById("movable-object");
const gameArea = document.getElementById("game-area");

// Inicializar enemigos y configurar el juego
let enemies = [];
let missiles = [];

// Función para registrar los mensajes en la consola del juego
function logToConsole(message) {
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  consoleOutput.appendChild(newMessage);
  consoleOutput.scrollTop = consoleOutput.scrollHeight; // Mantener el scroll al final
}

// Función para manejar el Game Over
function gameOver() {
  logToConsole("¡Game Over! Has chocado con un enemigo.");
  clearInterval(gameLoop); // Detener el bucle del juego
}

// Bucle del juego: mover el jugador, enemigos y misiles cada 10ms
const gameLoop = setInterval(() => {
  movePlayer(); // Mover el jugador
  moveEnemies(); // Mover enemigos
  moveMissiles(enemies); // Pasar el array de enemigos a la función de misiles
}, 10);
// Función para crear enemigos en intervalos
function spawnEnemies() {
  // Generar 3 enemigos inicialmente
  for (let i = 0; i < 3; i++) {
    let enemy = new Enemy(gameArea, enemyType);
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
