/* eslint-disable standard/no-callback-literal */
// Modules to control application life and create native browser window
const { app, BrowserWindow, systemPreferences } = require('electron')
const path = require('path')
const { server } = require('./src/index')
const { selfsign } = require('./gulpfile')
const port = process.env.PORT || 6767

// DEV
console.log(systemPreferences.isDarkMode())
// END DEV

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 260,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  })

  // disable security in windows
  app.commandLine.appendSwitch('allow-insecure-localhost', 'true')

  // and load the index.html of the app.
  mainWindow.loadFile('./src/public/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
  .then(selfsign())
  .then(server.listen(port, () => console.log(`App listening on port ${port}!`)))
  .then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.Z
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault()
  callback(true)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
