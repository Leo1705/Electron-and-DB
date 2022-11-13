const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
var PouchDB = require('pouchdb');

var db = new PouchDB('my_database');


if (require('electron-squirrel-startup')) {
  app.quit();
}
var mainWindow;
const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
      devTools: true,
      worldSafeExecuteJavaScript: true,
      allowRunningInsecureContent: false,
      maximizable: true,
      show: false
    },
  });


  mainWindow.loadFile(path.join(__dirname, 'src/index.html'));

  mainWindow.once('ready-to-show', () => {

    mainWindow.show();

  });
};

app.on('ready', () => {
  createWindow();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


ipcMain.on('rendertomain', (event, args) => {
  db.get('12').then(function (doc) {
    mainWindow.webContents.send("maintorender", doc);
    mainWindow.webContents.send("maintorender", "Main Process");
  }).catch(function (err) {
    console.log(err);
  });
  console.log(args);
})



