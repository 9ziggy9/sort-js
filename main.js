// We need app and BrowserWindow modules.
// App controls lifecycle while BrwoserWindow manages
// window and UI elements.
const {app, BrowserWindow} = require("electron");
const path = require("path");

console.log("Starting electron app...");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, // <-- bring up with ALT
    webPreferences: {
      // __dirname is in-built reference to current directory
      // ostensibly the output of pwd--> path.join just appends
      // preload file and saves in path
      preload: path.join(__dirname, "preload.js"),
    }
  });
  win.loadFile("index.html"); // <-- Load html entry
  // Will launch app with dev tools open in floating state.
  win.webContents.openDevTools({mode: "undocked"});
};

// After promise from app.whenReady() API is resolved,
// createWindow can be invoked. This concludes bootstrap.
app.whenReady().then(() => {
  createWindow();
});

// Close application on all window close Linux/Win
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
