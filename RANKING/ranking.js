import instanciaUnica from "../DATA/gestorUsuarios.js"; // Importar el gestor de usuarios
document.addEventListener('DOMContentLoaded', () => {
    // Llama a la función para crear la tabla
    inicializarUsuarios(); // Verificar si los usuarios están en el local storage
    crearTabla();
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

let ordenAscendente = { nombre: true, puntuacion: true, fecha: true };

function crearTabla() {
    const container = document.getElementById('tabla-container');
    container.innerHTML = ''; // Limpiar el contenedor

    const tabla = document.createElement('table');
    const thead = document.createElement('thead');
    const encabezadoRow = document.createElement('tr');

    // Crear encabezados (como en tu implementación anterior)
    const columnas = [
        { nombre: 'Imagen del usuario' },
        { nombre: 'Nombre', key: 'nombre' },
        { nombre: 'Puntuación', key: 'puntuacion' },
        { nombre: 'Fecha', key: 'fecha' },
        { nombre: 'Región' }
    ];

    columnas.forEach((columna) => {
        const th = document.createElement('th');
        th.textContent = columna.nombre;

        // Añadir evento de clic para ordenar si la columna tiene una clave de ordenación
        if (columna.key) {
            th.style.cursor = "pointer";
            th.addEventListener('click', () => ordenarPorColumna(columna.key));
        }

        encabezadoRow.appendChild(th);
    });
    thead.appendChild(encabezadoRow);
    tabla.appendChild(thead);

    // Crear el contenedor scrollable para el tbody
    const scrollableTbody = document.createElement('tbody');
    scrollableTbody.classList.add('scrollable-tbody'); // Añadir la clase para el scroll

    if (usuarios.length === 0) {
        const filaVacia = document.createElement('tr');
        const celdaVacia = document.createElement('td');
        celdaVacia.textContent = "No hay ningún récord";
        celdaVacia.colSpan = columnas.length;
        celdaVacia.style.textAlign = "center";
        filaVacia.appendChild(celdaVacia);
        scrollableTbody.appendChild(filaVacia);
    } else {
        // Llenar filas con los datos
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');

            // Columna de imagen
            const imgColumna = document.createElement('td');
            const img = document.createElement('img');
            img.src = usuario.imagen;
            img.alt = usuario.nombre;
            img.style.width = "70px";
            img.style.height = "70px";
            imgColumna.appendChild(img);
            fila.appendChild(imgColumna);

            // Columna de nombre
            const nombreColumna = document.createElement('td');
            nombreColumna.textContent = usuario.nombre;
            fila.appendChild(nombreColumna);

            // Columna de puntuación
            const puntuacionColumna = document.createElement('td');
            puntuacionColumna.textContent = usuario.puntuacion;
            fila.appendChild(puntuacionColumna);

            // Columna de fecha
            const fechaColumna = document.createElement('td');
            fechaColumna.textContent = usuario.fecha;
            fila.appendChild(fechaColumna);

            // Columna de región
            const regionColumna = document.createElement('td');
            regionColumna.textContent = usuario.region;
            fila.appendChild(regionColumna);

            scrollableTbody.appendChild(fila);
        });
    }

    tabla.appendChild(scrollableTbody); // Añade el tbody al contenedor de la tabla
    container.appendChild(tabla);
    if (usuarios.length !== 0) {
        let eliminarBtn = document.getElementById('eliminar-btn');
        if (!eliminarBtn) {
            eliminarBtn = document.createElement('button');
            eliminarBtn.id = 'eliminar-btn';
            eliminarBtn.textContent = 'Eliminar datos de la tabla';

            container.appendChild(eliminarBtn);

            eliminarBtn.addEventListener('click', () => {
                const filas = tabla.querySelectorAll('tbody tr');
                filas.forEach(fila => {
                    while (fila.firstChild) {
                        fila.removeChild(fila.firstChild);
                    }
                });
                usuarios = [];
                instanciaUnica.eliminarUsuarios()
                crearTabla();
                
            });
        }
    }
}


function ordenarPorColumna(columna) {
    const esAscendente = ordenAscendente[columna];
    if (usuarios.length !== 0) {
        usuarios.sort((a, b) => {
            if (columna === 'puntuacion') {
                return esAscendente ? a.puntuacion - b.puntuacion : b.puntuacion - a.puntuacion;
            }
            if (columna === 'fecha') {
                return esAscendente ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha);
            }
            if (columna === 'nombre') {
                return esAscendente ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre);
            }
        });

        ordenAscendente[columna] = !esAscendente;

        crearTabla();
    }

}

// Ordenar inicialmente por puntuación de mayor a menor
usuarios.sort((a, b) => b.puntuacion - a.puntuacion);
ordenAscendente.puntuacion = false; // Sincronizar el estado de ordenación para que el primer clic invierta correctamente
