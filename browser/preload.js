const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  pageLoadRequest: (url) => ipcRenderer.invoke('page-load-request', url)
})
