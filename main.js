const { app, BrowserWindow } = require('electron')
const path = require('path')
const childProcess = require('child_process');
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./ui-resources/index.html')
}

app.whenReady().then(() => {
  let binPath = path.resolve(__dirname, 'build', 'europa-win.exe');
  if (process.env.ELECTRON_PLATFORM === 'linux') {
    binPath = path.resolve(__dirname, 'build', 'europa-ubuntu20.04-amd64');
  }

  console.log(`bin path:`, binPath, 'files:', fs.readdirSync(path.resolve(__dirname, 'build')));

  childProcess.execFile(binPath, ['--tmp']);

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})