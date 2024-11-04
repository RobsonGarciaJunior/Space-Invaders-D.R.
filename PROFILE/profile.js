import instanciaUnica from '../DATA/gestorUsuarios.js';// Importar el gestor de usuarios
const usuarios = instanciaUnica.cargarUsuarios();
const profileForm = document.getElementById("profile_form");
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const usuarioLoggeado = instanciaUnica.obtenerUsuarioLoggeado();
    if (source === 'register' && usuarioLoggeado === null) {
        document.getElementById('titulo').textContent = 'Registro';
        document.getElementById('email').removeAttribute('readonly');
        document.getElementById('password').removeAttribute('readonly');
    } else {
        document.getElementById('username').value = usuarioLoggeado.nombre
        document.getElementById('email').value = usuarioLoggeado.email
        document.getElementById('password').remove();
        document.querySelector('label[for="password"]').remove()

        profileForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevenir el envío del formulario
        
            instanciaUnica.modificarUsuario(document.getElementById("username").value, usuarioLoggeado.nombre)
        
        });
    }
});