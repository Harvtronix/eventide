import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  pageLoadRequest: (url) => {
    return ipcRenderer.invoke('page-load-request', url)
  }
})
