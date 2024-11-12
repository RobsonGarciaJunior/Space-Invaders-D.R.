import GestorUsuarios from "../../DATA/gestorUsuarios.js";
const instanciaUnica = GestorUsuarios.getInstance();

document.addEventListener("DOMContentLoaded", () => {
  fetch("../UTILS/NAVBAR/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      mostrarUsuarioActivo();
      window.addEventListener("resize", actualizarUbicacionUsuarioDiv);

      const menu = document.getElementById("menu");
      menu.addEventListener("click", mostrarDesplegableNavbar);
    });
});

let usuarioDiv, usuarioButton, userDropDownMenu;

// Muestra el usuario activo con menú desplegable si existe
function mostrarUsuarioActivo() {
  const usuarioActivo = instanciaUnica.obtenerUsuarioLoggeado();

  if (usuarioActivo) {
    usuarioDiv = crearUsuarioDiv(usuarioActivo.imagen);
    actualizarUbicacionUsuarioDiv();

    usuarioButton.addEventListener("click", () => {
      userDropDownMenu.classList.toggle("show");
    });
  }
}

// Crea el contenedor del usuario y el menú desplegable
function crearUsuarioDiv(imagenUsuario) {
  const div = document.createElement("div");
  div.classList.add("usuario-activo-dropdown");

  usuarioButton = document.createElement("button");

  const usuarioImagen = document.createElement("img");
  usuarioImagen.src = imagenUsuario;
  usuarioImagen.alt = "Imagen del usuario";
  usuarioImagen.classList.add("usuario-imagen");

  usuarioButton.appendChild(usuarioImagen);
  usuarioButton.classList.add("usuario-button");

  userDropDownMenu = document.createElement("div");
  userDropDownMenu.classList.add("dropdown-menu");

  const editarPerfil = crearOpcionMenu("Editar Perfil", "../PROFILE/profile.html");
  const logout = crearOpcionMenu("Logout", "#");
  logout.addEventListener("click", () => instanciaUnica.cerrarSesion());

  userDropDownMenu.append(editarPerfil, logout);
  div.append(usuarioButton, userDropDownMenu);

  return div;
}

// Crea un elemento de opción de menú
function crearOpcionMenu(texto, href) {
  const opcion = document.createElement("a");
  opcion.href = href;
  opcion.textContent = texto;
  opcion.classList.add("dropdown-item");
  return opcion;
}

// Ubica usuarioDiv dependiendo del tamaño de la pantalla
function actualizarUbicacionUsuarioDiv() {
  const navbarButtons = document.getElementsByClassName("navbar-buttons")[0];
  const submenu = document.getElementById("subMenu");

  if (usuarioDiv && usuarioDiv.parentNode) {
    usuarioDiv.parentNode.removeChild(usuarioDiv);
  }

  if (window.innerWidth > 600) {
    submenu.style.display = "block";
    navbarButtons.appendChild(usuarioDiv);
  } else {
    submenu.style.display = "none";
    navbarButtons.appendChild(usuarioDiv);
  }
}

// Muestra u oculta el submenú en pantallas pequeñas
function mostrarDesplegableNavbar() {
  const submenu = document.getElementById("subMenu");

  if (window.innerWidth < 600) {
    submenu.style.display =
      submenu.style.display === "block" ? "none" : "block";
  }
}
