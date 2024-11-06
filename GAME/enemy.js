// Función para mover los enemigos hacia el jugador
function moveEnemies() {
  enemies.forEach((enemy) => {
    // const enemyPos = enemy.getBoundingClientRect();
    const playerPos = document.getElementById("player").getBoundingClientRect();

    // if (enemyPos.left < playerPos.left) {
    //   enemy.style.left = parseInt(enemy.style.left) + 1 + "px";
    // } else if (enemyPos.left > playerPos.left) {
    //   enemy.style.left = parseInt(enemy.style.left) - 1 + "px";
    // }

    // if (enemyPos.top < playerPos.top) {
    //   enemy.style.top = parseInt(enemy.style.top) + 1 + "px";
    // } else if (enemyPos.top > playerPos.top) {
    //   enemy.style.top = parseInt(enemy.style.top) - 1 + "px";
    // }

    // // Detección de colisiones
    // if (checkCollision(movableObject, enemy)) {
    //   gameOver();
    // }

    if (enemy.isAlive) {
      enemy.move(playerPos.left, playerPos.top);

    //   // Detección de colisiones
    //   if (checkCollision(playerPos, enemy.domElement)) {
    //     gameOver();
    //   }
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
