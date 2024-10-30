var usuarios = [
    { imagen: 'https://via.placeholder.com/50', nombre: 'Juan Pérez', puntuacion: 85, fecha: '2023-10-25', region: 'Latinoamérica' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Ana García', puntuacion: 90, fecha: '2023-10-26', region: 'Europa' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Carlos López', puntuacion: 78, fecha: '2023-10-27', region: 'Asia' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Laura Gómez', puntuacion: 88, fecha: '2023-10-28', region: 'Norteamérica' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Pedro Martín', puntuacion: 82, fecha: '2023-10-29', region: 'Oceanía' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'María Sánchez', puntuacion: 95, fecha: '2023-10-30', region: 'África' }
];

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

    tabla.appendChild(scrollableTbody); // Añade el tbody al contenedor de la tabla
    container.appendChild(tabla);

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
        });
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
crearTabla();
