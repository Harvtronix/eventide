import path from 'node:path'
import url from 'node:url'
import { BrowserWindow, app, ipcMain } from 'electron'

import { loadPageData } from './load-page-data.js'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const createWindow = async () => {
  const preloadPath = path.join(__dirname, 'preload.mjs')

  const win = new BrowserWindow({
    width: 1000,
    height: 720,
    webPreferences: {
      preload: preloadPath
    }
  })

  await win.loadFile('index.html')
}

app.whenReady().then(async () => {
  ipcMain.handle('page-load-request', loadPageData)

  await createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
