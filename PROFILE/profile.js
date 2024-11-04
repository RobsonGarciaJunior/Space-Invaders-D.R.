import instanciaUnica from '../DATA/gestorUsuarios.js';// Importar el gestor de usuarios
const usuarios = instanciaUnica.cargarUsuarios();
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    
    if (source === 'register') {
        document.getElementById('email').removeAttribute('readonly');
        document.getElementById('password').removeAttribute('readonly');
    } else {
        usuarios
    }
});