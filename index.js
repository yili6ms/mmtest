const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { Console } = require('console');
function createWindow() {
  const win = new BrowserWindow({
    fullscreen: false,
    width: 1800,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
  ipcMain.handle('open-file-dialog', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      title: 'Select a solution file',
      properties: ['openFile'],
      filters: [{ name: 'Solution File', extensions: ['sln'] }]
    });

    if (canceled || filePaths.length === 0) return null;
    console.log('File path at:', filePaths); 

    const outputPath = path.join(__dirname, 'output.mmd');
    console.log('File created at:', outputPath); 


    //const content = fs.readFileSync(filePaths[0], 'utf-8');

    const exePath = path.join(__dirname, 'net9.0', 'Codeanalysis.exe');
    revname = filePaths[0].replaceAll('\\', '/');
    return new Promise((resolve) => {
      exec(`"${exePath}" "${revname}"`, (error, stdout, stderr) => {
        console.log('exePath:', exePath);
        console.log('filePaths:', revname);
        if (error) {
          // Do nothing on error (resolve undefined)
          console.log(error)
          return resolve();
        }

      const outputPath = path.join(__dirname, 'output.mmd');
      console.log('File created at:', outputPath); 
      fs.readFile(outputPath, 'utf-8', (err, data) => {
        if (err) {
          return resolve(); // Do nothing if file can't be read
        }
        resolve(data.replaceAll('```mermaid', '').replaceAll('```','').replaceAll('   classDiagram', 'classDiagram')); // Return file content
      });
    }); });
      

    
  });
}

app.whenReady().then(createWindow);
