const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openFilePicker: () => ipcRenderer.invoke('open-file-picker')
});
