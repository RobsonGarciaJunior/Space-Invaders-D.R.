import instanciaUnica from "../DATA/gestorUsuarios.js"; // Importar el gestor de usuarios
const usuarios = instanciaUnica.cargarUsuarios();
const profileForm = document.getElementById("profile_form");
var file;
window.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById('imagen');
  imageInput.addEventListener('change', previewImage);

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
        file,
        document.getElementById("region").value,
        usuarioLoggeado.nombre,

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

// Define el array de regiones
const regiones = ["Latinoamérica", "Europa", "Asia", "Norteamérica", "Oceanía", "África"];

// Selecciona el elemento select en el DOM
const regionSelect = document.getElementById('region');

// Agrega cada región como una opción en el select
regiones.forEach(region => {
    const option = document.createElement('option'); // Crea una opción
    option.value = region; // Establece el valor de la opción
    option.textContent = region; // Establece el texto visible de la opción
    
    regionSelect.appendChild(option); // Añade la opción al select
});

function previewImage(event) {
  const imagePreview = document.getElementById('imagePreview');
  const file = event.target.files[0]; // Obtener el primer archivo seleccionado

  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          imagePreview.src = e.target.result; // Cambiar la fuente a la imagen seleccionada
      };
      this.file = reader.result;
      reader.readAsDataURL(file); // Leer la imagen como URL de datos
  } else {
      imagePreview.src = '../SOURCE/AlienLogo2.png'; // Volver a la imagen predeterminada si no hay archivo
  }
}

function inicializarImagen() {
  const imagePreview = document.getElementById('imagePreview');
  const usuario = instanciaUnica.obtenerUsuarioLoggeado()
  if (usuario.imagen) {
      imagePreview.src = usuario.imagen; // Si hay imagen del usuario, mostrarla
  } else {
      imagePreview.src = '../SOURCE/AlienLogo2.png'; // De lo contrario, mostrar la imagen predeterminada
  }
}
inicializarImagen()