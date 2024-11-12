import GestorUsuarios from "../DATA/gestorUsuarios.js";
const instanciaUnica = GestorUsuarios.getInstance();
const profileForm = document.getElementById("profile_form");
var imagen = "";
window.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById('imagen');
  imageInput.addEventListener('change', previewImage);

  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get("source");
  const usuarioLoggeado = instanciaUnica.obtenerUsuarioLoggeado();
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
      event.preventDefault();

      const resultado = instanciaUnica.modificarUsuario(
        document.getElementById("username").value,
        document.getElementById('imagePreview').src,
        document.getElementById("region").value,
        usuarioLoggeado.nombre,
      );

      if (resultado.status === "success") {
        alert(resultado.message);
        window.location.reload();
      } else {
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
  
  const regiones = ["Latinoamérica", "Europa", "Asia", "Norteamérica", "Oceanía", "África"];
  const regionSelect = document.getElementById('region');

  regiones.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = '../SOURCE/AlienLogo2.png';
    }
  }

  function inicializarImagen() {
    const imagePreview = document.getElementById('imagePreview');
    const usuario = instanciaUnica.obtenerUsuarioLoggeado()
    if (usuario.imagen) {
      imagePreview.src = usuario.imagen;
    } else {
      imagePreview.src = '../SOURCE/AlienLogo2.png';
    }
  }
  inicializarImagen()
});
