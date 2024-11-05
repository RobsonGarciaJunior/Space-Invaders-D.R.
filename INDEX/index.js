import instanciaUnica from "../DATA/gestorUsuarios.js"; // Importar el gestor de usuarios
document.addEventListener("DOMContentLoaded", () => {
  // Llama a la función para crear la tabla
  instanciaUnica.inicializarUsuarios(); // Inicializar usuarios al cargar la aplicación
});

const usuarioActivo = instanciaUnica.obtenerUsuarioLoggeado(); 

if (usuarioActivo !== null) {
    document.getElementById("profile").textContent = "Editar Perfil";
    document.getElementById("login").remove();
 }
