"use strict";
exports.__esModule = true;
require('electron-titlebar');
var CodeMirror = require("codemirror");
var editor;
var monacoglob;
console.log(document.getElementById("mainContent").childNodes[0]);
//require('../dist/editor')
/*
const loader = require('monaco-loader')

loader().then((monaco: any) => {
monacoglob = monaco;
editor = monaco.editor.create(document.getElementById('container'), {
language: 'javascript',
theme: 'vs-dark',
automaticLayout: true
})
})
*/
var textArea = document.getElementById("codemirror");
editor = CodeMirror.fromTextArea(textArea, {
    //various options - see CodeMirror docs
    mode: 'fitnesse',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    //theme: 'dracula',
    theme: 'duotone-light',
    showCursorWhenSelecting: true,
    viewportMargin: Infinity,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
var TabGroup = require('electron-tabs');
var tabGroup = new TabGroup();
tabGroup.addTab({
    title: 'Google',
    src: 'http://google.com'
});
tabGroup.addTab({
    title: "Electron",
    src: "http://electron.atom.io",
    visible: true,
    active: true
});
document.getElementById("mainContent").addEventListener("click", function (e) { return mouseDown(e); });
function mouseDown(event) {
    console.log('dfgdfgjij');
    var x = event.x;
    var y = event.y;
    console.log('x=' + x + ' y=' + y);
    //alert();
    /*
    let line = editor.getPosition();
    var range = new monacoglob.Range(line.lineNumber, 1, line.lineNumber, 1);
    var id = { major: 1, minor: 1 };
    var text = 'x=' + x + ' y=' + y;
    var op = {identifier: id, range: range, text: text, forceMoveMarkers: true};
    editor.executeEdits("my-source", [op]);
    */
}
//# sourceMappingURL=editor.js.map