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



window.addEventListener('DOMContentLoaded', () => {
  const diagram = document.getElementById('diagram');


  // Wait a bit to let mermaid render, then enable zoom
  setTimeout(() => {
    const panzoom = Panzoom(diagram.parentElement, {
      maxScale: 5,
      minScale: 0.2,
    });

    diagram.parentElement.addEventListener('wheel', panzoom.zoomWithWheel);
  }, 100);
});