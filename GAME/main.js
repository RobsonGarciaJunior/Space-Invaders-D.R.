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
// Variables para la puntuación
let score = 0; // Detectar clic del ratón para disparar

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


let enemyCount = 0; // Contador global para llevar el registro de los enemigos creados

// Función para crear enemigos en intervalos
function spawnEnemies() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      // Determinar el tipo de enemigo en función del número de enemigos creados
      let enemyType;

      if (enemyCount < 8) {
        // Los primeros 10 enemigos serán de tipo "easy"
        enemyType = "easy";
      } else {
        // Después del décimo enemigo, alternar entre "easy" y "medium" aleatoriamente
        enemyType = Math.random() < 0.5 ? "easy" : "medium";
      }
      enemyCount++;
      let enemy = new Enemy(gameArea, enemyType);

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
