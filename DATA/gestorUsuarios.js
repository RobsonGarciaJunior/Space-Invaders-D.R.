import { Usuario } from './usuario.js'; // Importar la clase Usuario

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
        const usuariosJSON = localStorage.getItem('usuarios');
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    }

    guardarUsuarios() {
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    agregarUsuario(usuario) {
        this.usuarios.push(usuario);
        this.guardarUsuarios();
    }

    verificarUsuario(nombre, contrasenna) {
        return this.usuarios.find(usuario => usuario.nombre === nombre && usuario.contrasenna === contrasenna);
    }

    inicializarUsuarios() {
        if (this.usuarios.length === 0) {
            const usuariosData = [
                new Usuario('https://via.placeholder.com/50', 'Juan', 'juan@gmail.com', 'juan1', 85, '2023-10-25', 'Latinoamérica'),
                new Usuario('https://via.placeholder.com/50', 'Ana', 'ana@gmail.com', 'ana1', 90, '2023-10-26', 'Europa'),
                new Usuario('https://via.placeholder.com/50', 'Carlos', 'carlos@gmail.com', 'carlos1', 78, '2023-10-27', 'Asia'),
                new Usuario('https://via.placeholder.com/50', 'Laura', 'laura@gmail.com', 'laura1', 88, '2023-10-28', 'Norteamérica'),
                new Usuario('https://via.placeholder.com/50', 'Pedro', 'pedro@gmail.com', 'pedro1', 82, '2023-10-29', 'Oceanía'),
                new Usuario('https://via.placeholder.com/50', 'María', 'maria@gmail.com', 'maria1', 95, '2023-10-30', 'África')
            ];
            usuariosData.forEach(usuario => this.agregarUsuario(usuario));
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
        return usuarioJSON? JSON.parse(usuarioJSON) : null;
    }

    modificarUsuario(nombreNuevo, nombre) {
        const usuarios = this.cargarUsuarios()
        var usuarioModificar = usuarios.find(usuario => usuario.nombre === nombre).nombre = nombreNuevo
        usuarioModificar.nombre = nombreNuevo
        this.obtenerUsuarioLoggeado().nombre = nombreNuevo;
        this.guardarUsuarios();
        window.location.reload();
    }

}

const instanciaUnica = new GestorUsuarios();
export default instanciaUnica;
