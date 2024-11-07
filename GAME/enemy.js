// Función para mover los enemigos hacia el jugador
function moveEnemies() {
  enemies.forEach((enemy) => {
    // const enemyPos = enemy.getBoundingClientRect();
    const playerPos = document.getElementById("player").getBoundingClientRect();

    if (enemy.isAlive) {
      enemy.move(playerPos.left, playerPos.top);

      // Detección de colisiones
      if (checkCollision(player.domElement, enemy.domElement)) {
        gameOver();
      }
    }
  });
}

// // Función para verificar si dos elementos colisionan
// function checkCollision(obj1, obj2) {
//   const rect1 = obj1.getBoundingClientRect();
//   const rect2 = obj2.getBoundingClientRect();

//   return !(
//     rect1.right < rect2.left ||
//     rect1.left > rect2.right ||
//     rect1.bottom < rect2.top ||
//     rect1.top > rect2.bottom
//   );
// }
// Función para verificar si dos elementos en el DOM están colisionando
function checkCollision(element1, element2) {
  // Obtener las coordenadas de los bordes de cada elemento
  const bounds1 = element1.getBoundingClientRect();
  const bounds2 = element2.getBoundingClientRect();

  // Verificar si los elementos NO están colisionando
  const noCollision =
    bounds1.right < bounds2.left ||   // Elemento 1 está a la izquierda de Elemento 2
    bounds1.left > bounds2.right ||   // Elemento 1 está a la derecha de Elemento 2
    bounds1.bottom < bounds2.top ||   // Elemento 1 está arriba de Elemento 2
    bounds1.top > bounds2.bottom;     // Elemento 1 está abajo de Elemento 2

  // Si no hay colisión, devolver falso. Si sí la hay, devolver verdadero.
  return !noCollision;
}
