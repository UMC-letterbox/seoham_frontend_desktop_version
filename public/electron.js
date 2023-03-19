var _a = require("electron"),
  app = _a.app,
  BrowserWindow = _a.BrowserWindow;
var path = require("path");
var isDev = require("electron-is-dev");
var mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 700,
    minWidth: 900,
    minHeight: 650,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: isDev,
    },
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : "file://".concat(path.join(__dirname, "../build/index.html"))
  );
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  mainWindow.setResizable(true);
  mainWindow.on("closed", function () {
    return (mainWindow = null);
  });
  mainWindow.focus();
}
app.on("ready", createWindow);
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
