import io from 'socket.io-client';
import watchPanel from './watchPanel';

export const ROLES = {
  receiver: 'receiver',
  sender: 'sender',
};

class GrafarSync {
  constructor() {
    this.callbacks = {};
  }

  connect(path, role) {
    if (this.socket) {
      console.warn('grafarso: cannot reconnect');
    }

    this.socket = io(path);
    this.role = role;

    this.socket.on('error', err => console.warn('grafarso socket error', err));

    if (this.role === ROLES.receiver) {
      this.socket.on('plot-data', payload => this.receive(payload));
    }
  }

  send(id, args) {
    if (this.role !== ROLES.sender) {
      return;
    }

    try {
      JSON.stringify(args);
    } catch(err) {
      console.warn('grafarso:', args, 'is not serializable');
    }

    this.socket.emit('plot-data', { id, args });
  }

  receive(payload) {
    if (this.role !== ROLES.receiver) {
      return;
    }
    if (!this.callbacks[payload.id]) {
      console.warn(`grafarso received update for non-registered callback ${id}`);
      return;
    }
    this.callbacks[payload.id](...payload.args);
  }

  register(id, callback) {
    if (!(callback instanceof Function)) {
      console.warn('grafarso:', callback, 'is not a callback');
    }

    this.callbacks[id] = callback;

    return (...args) => {
      // если отправка ломается, обернутая функция все равно вызывается
      setTimeout(() => this.send(id, args), 0);
      return callback(...args);
    }
  }

  registerPan(id, pan) {
    const genericId = `___pan___${ id }`;
    if (this.role === ROLES.sender) {
      const dummySetter = this.register(genericId, matrix => {});
      watchPanel(pan, dummySetter);
    } else if (this.role === ROLES.receiver) {
      this.register(genericId, pos => pan.camera.position.fromArray(pos));
    }
    return pan;
  }
}

export default new GrafarSync();
