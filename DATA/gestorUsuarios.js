// GestorUsuarios.js

import {Usuario} from "./usuario.js"; // Importar la clase Usuario

export class GestorUsuarios {
    constructor() {
        this.usuarios = this.cargarUsuarios();
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

    verificarUsuario(email, contrasenna) {
        return this.usuarios.find(usuario => usuario.email === email && usuario.contrasenna === contrasenna);
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
}

// export default GestorUsuarios; // Exportar la clase para usarla en otros módulos
