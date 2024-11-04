import instanciaUnica from '../DATA/gestorUsuarios.js';// Importar el gestor de usuarios
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para crear la tabla
    instanciaUnica.inicializarUsuarios(); // Inicializar usuarios al cargar la aplicación
});
