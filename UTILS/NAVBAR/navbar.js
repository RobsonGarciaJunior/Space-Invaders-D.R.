document.addEventListener("DOMContentLoaded", function () {
  fetch("../UTILS/NAVBAR/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    });

  mostrarUsuarioActivo();
});
// Función para verificar y mostrar el usuario activo
function mostrarUsuarioActivo() {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

  if (usuarioActivo) {
    // Crear el div para mostrar el nombre del usuario
    const usuarioDiv = document.createElement('div');
    usuarioDiv.textContent = `¡Hola, ${usuarioActivo.nombre}!`;
    usuarioDiv.classList.add('usuario-activo');

    // Añadir el nuevo div al navbar, junto al botón de Ranking
    const navbar = document.getElementById("navbar");
    navbar.appendChild(usuarioDiv);
  }
}