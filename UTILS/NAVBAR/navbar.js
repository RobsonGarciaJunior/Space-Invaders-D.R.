document.addEventListener("DOMContentLoaded", function () {
  fetch("../UTILS/NAVBAR/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      mostrarUsuarioActivo();
    });
});

// Función para verificar y mostrar el usuario activo con un menú desplegable
function mostrarUsuarioActivo() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo) {
    // Crear el contenedor del dropdown
    const usuarioDiv = document.createElement("div");
    usuarioDiv.classList.add("usuario-activo-dropdown");

    // Crear el botón que muestra el nombre del usuario
    const usuarioButton = document.createElement("button");
    usuarioButton.textContent = `¡Hola, ${usuarioActivo.nombre}!`;
    usuarioButton.classList.add("usuario-button");

    // Crear el contenedor del menú desplegable
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    // Opción de "Editar perfil"
    const editarPerfil = document.createElement("a");
    editarPerfil.href = "../PROFILE/profile.html";
    editarPerfil.textContent = "Editar Perfil";
    editarPerfil.classList.add("dropdown-item");

    // Opción de "Logout"
    const logout = document.createElement("a");
    logout.href = "#";
    logout.textContent = "Logout";
    logout.classList.add("dropdown-item");
    logout.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      window.location.reload(); // Recargar para reflejar el cambio
    });

    // Agregar opciones al menú desplegable
    dropdownMenu.appendChild(editarPerfil);
    dropdownMenu.appendChild(logout);

    // Añadir el botón y el menú al contenedor de usuario
    usuarioDiv.appendChild(usuarioButton);
    usuarioDiv.appendChild(dropdownMenu);

    // Agregar el nuevo contenedor al navbar
    const navbar = document.getElementById("navbar");
    navbar.appendChild(usuarioDiv);

    // Mostrar/Ocultar el menú desplegable al hacer clic en el botón
    usuarioButton.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });
  }
}
