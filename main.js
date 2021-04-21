const { app, BrowserWindow } = require('electron')
const path = require('path')
const childProcess = require('child_process');
const { resolve } = require('path');
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
  // childProcess.exec('build/europa-ubuntu20.04-amd64 --tmp');
  let bin = 'europa-win.exe'
  if (process.env.ELECTRON_PLATFORM === 'linux') {
    bin = 'europa-ubuntu20.04-amd64';
  }
  childProcess.execFile(`${__dirname}\\build\\${bin}`, ['--tmp']);
  console.log(`${__dirname}\\build`, fs.readdirSync(`${__dirname}\\build`));
  // childProcess.execFile('./build/europa.exe', ['--tmp']);
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