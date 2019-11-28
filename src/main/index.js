'use strict'

import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import * as tray from './tray'

const isDevelopment = process.env.NODE_ENV !== 'production'


// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow = null

function createMainWindow() {
  const window = new BrowserWindow()

  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  // __dirname 为：src\main
  console.log('main dirname:', __dirname)

  // 把html放入static
  let indexPath = path.join(__dirname, '../../static/html/index.html')
  console.log('indexPath:', indexPath)
  window.loadURL(formatUrl({
    pathname: indexPath,
    protocol: 'file',
    slashes: true
  }))

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
  
  // create tray
  tray.creatTray()
})

export function getWin () {
  return mainWindow
}