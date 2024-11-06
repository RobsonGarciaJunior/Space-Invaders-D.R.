import { Usuario } from "./usuario.js"; // Importar la clase Usuario

export class GestorUsuarios {
  constructor() {
    if (GestorUsuarios.instance) {
      return GestorUsuarios.instance;
    } else {
      this.usuarios = this.cargarUsuarios();
      this.inicializarUsuarios();
      GestorUsuarios.instance = this;
    }
  }

  cargarUsuarios() {
    const usuariosJSON = localStorage.getItem("usuarios");
    return usuariosJSON ? JSON.parse(usuariosJSON) : [];
  }

  guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
  }

  agregarUsuario(usuario) {
    this.usuarios.push(usuario);
    this.guardarUsuarios();
  }

  eliminarUsuarios() {
    this.usuarios = [];
    this.guardarUsuarios();
  }

  verificarUsuario(nombre, contrasenna) {
    return this.usuarios.find(
      (usuario) =>
        usuario.nombre === nombre && usuario.contrasenna === contrasenna
    );
  }

    inicializarUsuarios() {
    if (this.usuarios.length === 0) {
      const usuariosData = [
        new Usuario(
          "https://via.placeholder.com/50",
          "Juan",
          "juan@gmail.com",
          "juan1",
          85,
          "2023-10-25",
          "Latinoamérica"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "Ana",
          "ana@gmail.com",
          "ana1",
          90,
          "2023-10-26",
          "Europa"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "Carlos",
          "carlos@gmail.com",
          "carlos1",
          78,
          "2023-10-27",
          "Latinoamérica"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "Laura",
          "laura@gmail.com",
          "laura1",
          88,
          "2023-10-28",
          "Norteamérica"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "Pedro",
          "pedro@gmail.com",
          "pedro1",
          82,
          "2023-10-29",
          "Oceanía"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "María",
          "maria@gmail.com",
          "maria1",
          95,
          "2023-10-30",
          "África"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "GuanChinPen",
          "guan@gmail.com",
          "guan1",
          795,
          "2023-10-30",
          "China"
        ),
        new Usuario(
          "https://via.placeholder.com/50",
          "Ming Chao",
          "ming@gmail.com",
          "ming1",
          495,
          "2023-10-30",
          "China"
        ),
      ];
      usuariosData.forEach((usuario) => this.agregarUsuario(usuario));
    }
  }

  iniciarSesionUsuario(usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  }

  // Función para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    alert("Has cerrado sesión.");
    window.location.reload(); // Recargar la página o redirigir al login
  }

  obtenerUsuarioLoggeado() {
    const usuarioJSON = localStorage.getItem("usuarioActivo");
    return usuarioJSON ? JSON.parse(usuarioJSON) : null;
  }

  modificarUsuario(nombreNuevo, imgNueva, regionNueva, nombre) {
    // Buscar el usuario a modificar en el array de usuarios
    const usuarioModificar = this.usuarios.find(
      (usuario) => usuario.nombre === nombre
    );

    if (usuarioModificar) {
      // Actualizar el nombre del usuario en el array de usuarios
      //Verificar si el nombreNuevo ya existe en el array de usuarios
      const existeNombreNuevo = this.usuarios.some(
        (usuario) => usuario.nombre === nombreNuevo
      );

      if (existeNombreNuevo || usuarioModificar.nombre === nombre) {
        const existeNombreEnRegion = this.usuarios.some(
          (usuario) =>
            usuario.nombre === nombreNuevo &&
            usuario.region === usuarioModificar.region
        );
        if (existeNombreEnRegion && usuarioModificar.nombre !== nombre) {
          console.error("El nombre nuevo ya existe.");
          return {
            status: "error",
            message: "Este nombre de usuario ya existe en esta región.",
          };
        }
      }

      usuarioModificar.nombre = nombreNuevo;
      usuarioModificar.imagen = imgNueva
      usuarioModificar.region = regionNueva;
      // Guardar la lista de usuarios actualizada en localStorage
      this.guardarUsuarios();

      // Actualizar el usuario logueado si coincide con el usuario modificado
      const usuarioLogueado = this.obtenerUsuarioLoggeado();
      if (usuarioLogueado && usuarioLogueado.nombre === nombre) {
        usuarioLogueado.nombre = nombreNuevo;
        usuarioLogueado.imagen = imgNueva
        usuarioLogueado.region = regionNueva;
        // Guardar el usuario logueado actualizado en localStorage
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioLogueado));
      }
      return { status: "success", message: "Usuario modificado correctamente" };

      //   // Recargar la página para reflejar los cambios
    } else {
      console.error("Usuario no encontrado.");
    }
  }
}

const instanciaUnica = new GestorUsuarios();
export default instanciaUnica;
