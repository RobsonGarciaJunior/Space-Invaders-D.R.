// Datos de ejemplo
const usuarios = [
    { imagen: 'https://via.placeholder.com/50', nombre: 'Juan Pérez', puntuacion: 85, fecha: '2023-10-25', region: 'Latinoamérica' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Ana García', puntuacion: 90, fecha: '2023-10-26', region: 'Europa' },
    { imagen: 'https://via.placeholder.com/50', nombre: 'Carlos López', puntuacion: 78, fecha: '2023-10-27', region: 'Asia' }
];

// Estado inicial de ordenación: nombre y fecha en ascendente, puntuación en descendente
let ordenAscendente = { nombre: true, puntuacion: true, fecha: true };

// Función para crear la tabla
function crearTabla(datos) {
    const container = document.getElementById('tabla-container');
    container.innerHTML = ''; // Limpiar el contenedor

    const tabla = document.createElement('table');
    tabla.border = "1";
    tabla.style.width = "100%";
    tabla.style.borderCollapse = "collapse";

    const thead = document.createElement('thead');
    const encabezadoRow = document.createElement('tr');

    // Encabezados de columna con eventos de clic para ordenar
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
        th.style.padding = "10px";
        th.style.backgroundColor = "#f2f2f2";

        // Añadir evento de clic para ordenar si la columna tiene una clave de ordenación
        if (columna.key) {
            th.style.cursor = "pointer";
            th.addEventListener('click', () => ordenarPorColumna(datos, columna.key));
        }

        encabezadoRow.appendChild(th);
    });
    thead.appendChild(encabezadoRow);
    tabla.appendChild(thead);

    // Crear cuerpo de la tabla
    const tbody = document.createElement('tbody');

    // Llenar filas con los datos
    datos.forEach(usuario => {
        const fila = document.createElement('tr');

        // Columna de imagen
        const imgColumna = document.createElement('td');
        const img = document.createElement('img');
        img.src = usuario.imagen;
        img.alt = usuario.nombre;
        img.style.width = "50px";
        img.style.height = "50px";
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

        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    container.appendChild(tabla);
}

// Función para ordenar los datos por una columna específica
function ordenarPorColumna(datos, columna) {
    const esAscendente = ordenAscendente[columna];
    
    datos.sort((a, b) => {
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

    // Cambia el orden para la próxima vez que se haga clic
    ordenAscendente[columna] = !esAscendente;
    
    // Recrea la tabla con los datos ordenados
    crearTabla(datos);
}

// Ordenar inicialmente por puntuación de mayor a menor
usuarios.sort((a, b) => b.puntuacion - a.puntuacion);
ordenAscendente.puntuacion = false;  // Sincronizar el estado de ordenación para que el primer clic invierta correctamente
crearTabla(usuarios);
