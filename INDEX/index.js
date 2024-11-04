import { GestorUsuarios } from '../DATA/gestorUsuarios.js'; // Importar el gestor de usuarios
const gestorUsuarios = new GestorUsuarios(); // Crear una instancia del gestor de usuarios
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para crear la tabla
    gestorUsuarios.inicializarUsuarios(); // Inicializar usuarios al cargar la aplicación
});