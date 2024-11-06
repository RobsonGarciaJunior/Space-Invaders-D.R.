class Observable {
  constructor() {
    this.listeners = [];
  }

  // Método para suscribirse a cambios
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // Notificar a todos los suscriptores
  notify(data) {
    this.listeners.forEach((listener) => listener(data));
  }
}
