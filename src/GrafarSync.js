import io from 'socket.io-client';

class GrafarSync {
  constructor() {
    this.callbacks = {};
  }

  connect(path, role) {
    if (this.socket) {
      console.warn('grafarso cannot reconnect');
    }

    this.socket = io(path);
    this.role = role;

    this.socket.on('connect', () => console.info('grafarso connected'));
    this.socket.on('error', err => console.warn('grafarso socket error', err));

    if (this.role === 'receiver') {
      this.socket.on('plot-data', payload => this.receive(payload));
    }
  }

  send(id, args) {
    if (this.role !== 'sender') {
      return;
    }

    try {
      JSON.stringify(args);
    } catch(err) {
      console.warn('grafarso:', args, 'is not serializable');
    }

    console.log('send', {id, args});
    this.socket.emit('plot-data', { id, args });
  }

  receive(payload) {
    if (this.role !== 'receiver') {
      console.warn('grafarso sender cannot receive');
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
      this.send(id, args);
      return callback(...args);
    }
  }
}

export default new GrafarSync();
