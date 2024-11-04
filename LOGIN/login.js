import instanciaUnica from '../DATA/gestorUsuarios.js';// Importar el gestor de usuarios

// Manejo del formulario de inicio de sesión
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login_form");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    const nombre = document.getElementById("username").value;
    const contrasenna = document.getElementById("password").value;

    const usuarioVerificado = instanciaUnica.verificarUsuario(nombre, contrasenna);

    if (usuarioVerificado) {
      instanciaUnica.iniciarSesionUsuario(usuarioVerificado);
      window.location.href = "../index/index.html"; // Redirigir al index.html
    } else {
      alert("Error: usuario o contraseña incorrectos.");
    }
  });
});
