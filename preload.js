const {contextBridge} = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // WE CAN ALSO EXPOSE VARIABLS, not just fns
});
