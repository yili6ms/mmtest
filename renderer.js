const { ipcRenderer } = require('electron');

const button = document.getElementById('loadBtn');
const diagramDiv = document.getElementById('diagram');

button.addEventListener('click', async () => {
  const content = await ipcRenderer.invoke('open-file-dialog');
  if (content) {
    diagramDiv.textContent = content;
    window.mermaid.init(undefined, diagramDiv);
  } else {
    diagramDiv.textContent = 'No file selected.';
  }
});
