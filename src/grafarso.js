import GrafarSync from './GrafarSync';

export const from = path => GrafarSync.connect(path, 'receiver');
export const to = path => GrafarSync.connect(path, 'sender');
export const register = (id, fn) => GrafarSync.register(id, fn);
export const registerPan = (id, pan) => GrafarSync.registerPan(id, pan);
