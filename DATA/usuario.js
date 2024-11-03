// Clase Usuario
export default class Usuario {
    constructor(imagen, nombre, email, contrasenna, puntuacion, fecha, region) {
        this.imagen = imagen;
        this.nombre = nombre;
        this.email = email;
        this.contrasenna = contrasenna;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
        this.region = region;
    }
}
// export default Usuario; // Exportar la clase para usarla en otros módulos
