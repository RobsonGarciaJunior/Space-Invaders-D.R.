// // login.js

// import GestorUsuarios from '../DATA/gestorUsuarios'; // Importar el gestor de usuarios

// const gestorUsuarios = new GestorUsuarios(); // Crear una instancia de GestorUsuarios

// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form');

//     loginForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevenir el envío del formulario

//         const email = document.getElementById('username').value;
//         const contrasenna = document.getElementById('password').value;

//         const usuarioVerificado = gestorUsuarios.verificarUsuario(email, contrasenna);

//         if (usuarioVerificado) {
//             alert('¡Inicio de sesión exitoso!');
//             window.location.href = 'index.html'; // Redirigir al index.html
//         } else {
//             alert('Error: usuario o contraseña incorrectos.');
//         }
//     });
// });
// Inicializar usuarios solo si no están ya en localStorage
if (!localStorage.getItem('usuarios')) {
    const usuarios = [
        { imagen: 'https://via.placeholder.com/50', nombre: 'Juan', email: 'juan@gmail.com', contrasenna: 'juan1', puntuacion: 85, fecha: '2023-10-25', region: 'Latinoamérica' },
        { imagen: 'https://via.placeholder.com/50', nombre: 'Ana', email: 'ana@gmail.com', contrasenna: 'ana1', puntuacion: 90, fecha: '2023-10-26', region: 'Europa' },
        { imagen: 'https://via.placeholder.com/50', nombre: 'Carlos', email: 'carlos@gmail.com', contrasenna: 'carlos1', puntuacion: 78, fecha: '2023-10-27', region: 'Asia' },
        { imagen: 'https://via.placeholder.com/50', nombre: 'Laura', email: 'laura@gmail.com', contrasenna: 'laura1', puntuacion: 88, fecha: '2023-10-28', region: 'Norteamérica' },
        { imagen: 'https://via.placeholder.com/50', nombre: 'Pedro', email: 'pedro@gmail.com', contrasenna: 'pedro1', puntuacion: 82, fecha: '2023-10-29', region: 'Oceanía' },
        { imagen: 'https://via.placeholder.com/50', nombre: 'María', email: 'maria@gmail.com', contrasenna: 'maria1', puntuacion: 95, fecha: '2023-10-30', region: 'África' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para verificar usuario
function verificarUsuario(nombre, contrasenna) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(usuario => usuario.nombre === nombre && usuario.contrasenna === contrasenna);
}

// Función para gestionar la sesión activa
function iniciarSesionUsuario(usuario) {
    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('usuarioActivo');
    alert('Has cerrado sesión.');
    window.location.reload(); // Recargar la página o redirigir al login
}

// Manejo del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login_form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const nombre = document.getElementById('username').value;
        const contrasenna = document.getElementById('password').value;

        const usuarioVerificado = verificarUsuario(nombre, contrasenna);

        if (usuarioVerificado) {
            alert('¡Inicio de sesión exitoso!');
            iniciarSesionUsuario(usuarioVerificado);

            window.location.href = '../index/index.html'; // Redirigir al index.html
        } else {
            alert('Error: usuario o contraseña incorrectos.');
        }
    });
});