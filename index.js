const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
  ipcMain.handle('open-file-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Select a Mermaid file',
      properties: ['openFile'],
      filters: [{ name: 'Mermaid', extensions: ['mmd', 'txt', 'md'] }]
    });

    if (canceled || filePaths.length === 0) return null;

    const content = fs.readFileSync(filePaths[0], 'utf-8');
    return content;
  });
}

app.whenReady().then(createWindow);
