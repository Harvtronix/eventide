// Must use require for electron import in a preload context
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  pageLoadRequest: (url) => {
    return ipcRenderer.invoke('page-load-request', url)
  }
})
