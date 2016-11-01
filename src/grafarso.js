import GrafarSync, {ROLES} from './GrafarSync';

export const from = path => GrafarSync.connect(path, ROLES.receiver);
export const to = path => GrafarSync.connect(path, ROLES.sender);
export const register = (id, fn) => GrafarSync.register(id, fn);
export const registerPan = (id, pan) => GrafarSync.registerPan(id, pan);
