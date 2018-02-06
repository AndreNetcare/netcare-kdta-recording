"use strict";
exports.__esModule = true;
require('electron-titlebar');
var ipcRenderer = require('electron').ipcRenderer;
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
    //theme: 'duotone-light',
    showCursorWhenSelecting: true,
    viewportMargin: Infinity,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
function updateCodeMirror(data) {
    var cm = editor;
    var doc = cm.getDoc();
    var cursor = doc.getCursor(); // gets the line number in the cursor position
    var line = doc.getLine(cursor.line); // get the line contents
    var pos = {
        line: cursor.line,
        ch: line.length - 1 // set the character position to the end of the line
    };
    doc.replaceRange('\n' + data + '\n', pos); // adds a new line
}
var TabGroup = require('electron-tabs');
var tabGroup = new TabGroup();
tabGroup.addTab({
    title: 'Google',
    src: 'http://google.com',
    webviewAttributes: {
        'nodeintegration': true
    }
});
var tab = tabGroup.addTab({
    title: "Electron",
    src: "http://electron.atom.io",
    visible: true,
    active: true,
    webviewAttributes: {
        'nodeintegration': true,
        'preload': "../dist/test.js"
    }
});
document.getElementById("mainContent").addEventListener("click", function (e) { return mouseDown(e); });
var _loop_1 = function (tab_1) {
    var webview = tab_1.webview;
    webview.addEventListener('dom-ready', function () {
        webview.openDevTools();
        console.log(webview.getWebContents());
        //webview.getWebContents().getElementsByTagName("body")[0].addEventListener ("click", (e:MouseEvent) => mouseDown(e));
        var code = "console.log('lol'); \n                window.addEventListener (\"click\", function (e){\n                        var x = e.x;\n                        var y = e.y;\n                        console.log('x=' + x + ' y=' + y);\n                        this.updateCodeMirror2('clicked at: ' + 'x=' + x + ' y=' + y);\n                        //const {ipcRenderer} = require('electron');\n                        //var remote = require('remote');\n                        //var ipc = remote.require('ipc');\n                        //ipc.send(\"alert-something\", 'clicked in borwser at: ' + 'x=' + x + ' y=' + y);   \n                });";
        //webview.executeJavaScript(code); 
        // alert-something
        webview.addEventListener('ipc-message', function (event) {
            console.log(event.channel);
            updateCodeMirror(event.channel);
        });
        //webview.send('alert-something' , {msg:'hello from main process'});
    });
};
for (var _i = 0, _a = tabGroup.getTabs(); _i < _a.length; _i++) {
    var tab_1 = _a[_i];
    _loop_1(tab_1);
}
function mouseDown(event) {
    console.log('dfgdfgjij');
    var x = event.x;
    var y = event.y;
    console.log('x=' + x + ' y=' + y);
    updateCodeMirror('clicked at: ' + 'x=' + x + ' y=' + y);
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
updateCodeMirror("fsdf");
ipcRenderer.on("alert-something", function (data) {
    console.log("recived something");
    updateCodeMirror(data);
});
//# sourceMappingURL=editor.js.map