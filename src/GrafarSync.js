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
      // если отправка ломается, обернутая функция все равно вызывается
      setTimeout(() => this.send(id, args), 0);
      return callback(...args);
    }
  }

  registerPan(id, pan) {
    const genericId = `___pan___${ id }`;
    if (this.role === 'sender') {
      const dummySetter = this.register(genericId, matrix => {});

      let lastPos = [];
      const testPanel = () => {
        const pos = pan.camera.position.toArray();
        if (pos.some((c, i) => c !== lastPos[i])) {
          dummySetter(pos);
        }
        lastPos = pos;
        window.requestAnimationFrame(testPanel);
      };
      testPanel();
    } else if (this.role === 'receiver') {
      this.register(genericId, pos => pan.camera.position.fromArray(pos));
    }
    return pan;
  }
}

export default new GrafarSync();
