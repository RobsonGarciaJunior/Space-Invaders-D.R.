// Variables para el movimiento del jugador
let moveUpKey = false;
let moveDownKey = false;
let moveLeftKey = false;
let moveRightKey = false;

// Detectar las teclas de dirección
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase(); // Convertir la tecla a minúscula

  switch (key) {
    case "d":
      moveRightKey = true;
      break;
    case "a":
      moveLeftKey = true;
      break;
    case "w":
      moveUpKey = true;
      break;
    case "s":
      moveDownKey = true;
      break;
    default:
    // logToConsole(`Tecla no asignada: ${key}`);
  }
});

// Detectar las teclas que se sueltan
window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase(); // Convertir la tecla a minúscula

  switch (key) {
    case "d":
      moveRightKey = false;
      break;
    case "a":
      moveLeftKey = false;
      break;
    case "w":
      moveUpKey = false;
      break;
    case "s":
      moveDownKey = false;
      break;
  }
});

// Función para mover el jugador basado en las teclas presionadas
function movePlayer() {
  if (moveRightKey) {
    player.move("right");
  }
  if (moveLeftKey) {
    player.move("left");
  }
  if (moveUpKey) {
    player.move("up");
  }
  if (moveDownKey) {
    player.move("down");
  }
}
gameArea.addEventListener("mousemove", (event) => {
  // Llamar a rotateToMouse para actualizar la rotación del jugador
  player.rotateToMouse(event.clientX, event.clientY);
});
