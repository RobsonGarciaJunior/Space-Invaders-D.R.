import instanciaUnica from "../DATA/gestorUsuarios.js"; // Importar el gestor de usuarios
const usuarios = instanciaUnica.cargarUsuarios();
const profileForm = document.getElementById("profile_form");
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get("source");
  const usuarioLoggeado = instanciaUnica.obtenerUsuarioLoggeado();
  // if (source === 'register' && usuarioLoggeado === null) {
  if (usuarioLoggeado === null) {
    document.getElementById("titulo").textContent = "Registro";
    document.getElementById("email").removeAttribute("readonly");
    document.getElementById("password").removeAttribute("readonly");
  } else {
    document.getElementById("username").value = usuarioLoggeado.nombre;
    document.getElementById("email").value = usuarioLoggeado.email;
    document.getElementById("password").remove();
    document.querySelector('label[for="password"]').remove();

    profileForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevenir el envío del formulario

      const resultado = instanciaUnica.modificarUsuario(
        document.getElementById("username").value,
        usuarioLoggeado.nombre
      );

      if (resultado.status === "success") {
        // Si el cambio fue exitoso, recargar la página o mostrar mensaje de éxito
        alert(resultado.message);
        window.location.reload();
      } else {
        // Si hubo un error, mostrar el mensaje en la pantalla
        const errorContainer =
          document.getElementById("errorContainer") ||
          document.createElement("div");
        errorContainer.id = "errorContainer";
        errorContainer.style.color = "red";
        errorContainer.textContent = resultado.message;
        profileForm.appendChild(errorContainer);
      }
    });
  }
});
