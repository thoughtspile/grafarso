const panelStatesEqual = (state1, state2) => (
  Object.keys(state1).every(key => state1[key].every((c, i) => c === state2[key][i]))
);

export const watchPanel = (pan, cb) => {
  let lastState = {
    position: [],
    target: [],
  };

  const testPanel = () => {
    const state = {
      position: pan.camera.position.toArray(),
      target: pan.controls.target.toArray(),
    };
    if (!panelStatesEqual(lastState, state)) {
      cb(state);
    }
    lastState = state;
    window.requestAnimationFrame(testPanel);
  };
  testPanel();
};

export const setPanel = (state) => {
  pan.camera.position.fromArray(state.position);
  pan.controls.target.fromArray(state.target);
}
