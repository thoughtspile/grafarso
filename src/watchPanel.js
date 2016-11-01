export default (pan, cb) => {
  let lastPos = [];
  const testPanel = () => {
    const pos = pan.camera.position.toArray();
    if (pos.some((c, i) => c !== lastPos[i])) {
      cb(pos);
    }
    lastPos = pos;
    window.requestAnimationFrame(testPanel);
  };
  testPanel();
}
