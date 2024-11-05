import instanciaUnica from "../DATA/gestorUsuarios.js"; // Importar el gestor de usuarios
document.addEventListener("DOMContentLoaded", () => {
  // Llama a la función para crear la tabla
  instanciaUnica.inicializarUsuarios(); // Inicializar usuarios al cargar la aplicación
  updateButtons(); // Actualiza los botones según el estado de la sesión
});

function updateButtons() {
  const usuarioActivo = instanciaUnica.obtenerUsuarioLoggeado(); // Verificar usuario logueado

  const loginButton = document.getElementById("login");
  const jugarButton = document.getElementById("jugar");

  if (usuarioActivo !== null) {
    // Si el usuario está logueado, mostrar el botón "Jugar" y ocultar "Iniciar Sesión"
    jugarButton.style.display = "block"; // Mostrar botón Jugar
    loginButton.style.display = "none"; // Ocultar botón Iniciar Sesión
  } else {
    // Si el usuario no está logueado, ocultar "Jugar" y mostrar "Iniciar Sesión"
    jugarButton.style.display = "none"; // Ocultar botón Jugar
    loginButton.style.display = "block"; // Mostrar botón Iniciar Sesión
  }
}
// if (usuarioActivo !== null) {
//   document.getElementById("login").remove();
//     document.getElementById("profile").textContent = "Editar Perfil";
//  }
