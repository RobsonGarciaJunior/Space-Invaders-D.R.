const joystick = document.getElementById("joystick");
const joystickHandle = document.getElementById("joystick-handle");

// Variables para almacenar dirección y distancia del joystick
let joystickDirection = { angle: 0, distance: 0 };

joystick.addEventListener("touchstart", startMove, false);
joystick.addEventListener("touchmove", moveJoystick, false);
joystick.addEventListener("touchend", endMove, false);

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
  if (window.innerWidth < 600) {
    // Usar joystick en pantallas pequeñas
    const { angle, distance } = joystickDirection;

    if (distance > 0) {
      // Determina la dirección en función del ángulo
      if (angle > -Math.PI / 4 && angle <= Math.PI / 4) {
        player.move("right");
      } else if (angle > Math.PI / 4 && angle <= (3 * Math.PI) / 4) {
        player.move("down");
      } else if (angle > (3 * Math.PI) / 4 || angle <= -(3 * Math.PI) / 4) {
        player.move("left");
      } else if (angle > -(3 * Math.PI) / 4 && angle <= -Math.PI / 4) {
        player.move("up");
      }
    }
  } else {
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
}

gameArea.addEventListener("mousemove", (event) => {
  // Llamar a rotateToMouse para actualizar la rotación del jugador
  player.rotateToMouse(event.clientX, event.clientY);
});