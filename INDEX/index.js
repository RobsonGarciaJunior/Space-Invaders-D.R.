// import GestorUsuarios from '../DATA/gestorUsuarios'; // Importar el gestor de usuarios
// const gestorUsuarios = new GestorUsuarios(); // Crear una instancia del gestor de usuarios
// document.addEventListener('DOMContentLoaded', () => {
//     // Llama a la función para crear la tabla
//     gestorUsuarios.inicializarUsuarios(); // Inicializar usuarios al cargar la aplicación
// });
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para crear la tabla
    inicializarUsuarios(); // Verificar si los usuarios están en el local storage
});

let usuarios = []; // Definimos el array de usuarios

// Inicializa los usuarios si no están en local storage
function inicializarUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuarios");

    if (usuariosGuardados) {
        // Si hay usuarios guardados, parseamos y asignamos al array
        usuarios = JSON.parse(usuariosGuardados);
    } else {
        // Si no hay usuarios guardados, inicializamos el array con datos por defecto
        usuarios = [
            { imagen: 'https://via.placeholder.com/50', nombre: 'Juan', email: 'juan@gmail.com', contrasenna: 'juan1', puntuacion: 85, fecha: '2023-10-25', region: 'Latinoamérica' },
            { imagen: 'https://via.placeholder.com/50', nombre: 'Ana', email: 'ana@gmail.com', contrasenna: 'ana1', puntuacion: 90, fecha: '2023-10-26', region: 'Europa' },
            { imagen: 'https://via.placeholder.com/50', nombre: 'Carlos', email: 'carlos@gmail.com', contrasenna: 'carlos1', puntuacion: 78, fecha: '2023-10-27', region: 'Asia' },
            { imagen: 'https://via.placeholder.com/50', nombre: 'Laura', email: 'laura@gmail.com', contrasenna: 'laura1', puntuacion: 88, fecha: '2023-10-28', region: 'Norteamérica' },
            { imagen: 'https://via.placeholder.com/50', nombre: 'Pedro', email: 'pedro@gmail.com', contrasenna: 'pedro1', puntuacion: 82, fecha: '2023-10-29', region: 'Oceanía' },
            { imagen: 'https://via.placeholder.com/50', nombre: 'María', email: 'maria@gmail.com', contrasenna: 'maria1', puntuacion: 95, fecha: '2023-10-30', region: 'África' }
        ];

        // Guardar los usuarios en local storage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
}