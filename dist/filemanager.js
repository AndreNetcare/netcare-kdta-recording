/*
import { ipcRenderer, remote } from 'electron';
const fs = require('fs');

export class FileManager {
  constructor( editor: any, monaco: any) {
    this.editor = editor;
    this.monaco = monaco;

    // When we receive a 'open-file' message, open the file
    ipcRenderer.on('open-file', (e: any, url: URL) => this.openFile(url));

    document.querySelector('#save').onclick = () => this.saveFile();
  }

  openFile(url) {
    // fs.readFile doesn't know what `file://` means
    const parsedUrl = (url.slice(0, 7) === 'file://') ? url.slice(7) : url;

    fs.readFile(parsedUrl, 'utf-8', (err, data) => {
      this.editor.setModel(this.monaco.editor.createModel(data, 'javascript'));
    });
  }

  saveFile() {
    remote.dialog.showSaveDialog((filename) => {
      if (!filename) return;

      const model = this.editor.getModel();
      let data = '';

      model._lines.forEach((line) => {
        data += line.text + model._EOL;
      });

      fs.writeFile(filename, data, 'utf-8');
    });
  }
}
*/
//# sourceMappingURL=filemanager.js.map