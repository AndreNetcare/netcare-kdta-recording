
import { remote } from 'electron';
import { request } from 'https';

require('electron-titlebar')

const {ipcRenderer} = require('electron');


import CodeMirror = require('codemirror');

let editor: any;
let monacoglob: any;
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

const textArea = <HTMLTextAreaElement>document.getElementById("codemirror");

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
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        })

        function updateCodeMirror(data: string){
                var cm = editor;
                var doc = cm.getDoc();
                var cursor = doc.getCursor(); // gets the line number in the cursor position
                var line = doc.getLine(cursor.line); // get the line contents
                var pos = { // create a new object to avoid mutation of the original selection
                    line: cursor.line,
                    ch: line.length - 1 // set the character position to the end of the line
                }
                doc.replaceRange('\n'+data+'\n', pos); // adds a new line
            }

const TabGroup = require('electron-tabs');

let tabGroup = new TabGroup();
tabGroup.addTab({
title: 'Google',
src: 'http://google.com',
webviewAttributes: {
    'nodeintegration': true
}
});


let tab = tabGroup.addTab({
title: "Electron",
src: "http://electron.atom.io",
visible: true,
active: true,
webviewAttributes: {
        'nodeintegration': true,
        'preload' : "../dist/inspector.js"
      
    }
});


document.getElementById("mainContent").addEventListener ("click", (e:MouseEvent) => mouseDown(e));

for (let tab of tabGroup.getTabs()){
        const webview = tab.webview;
        
        webview.addEventListener('dom-ready', () => {
                webview.openDevTools()
                console.log(webview.getWebContents());
                
                //webview.getWebContents().getElementsByTagName("body")[0].addEventListener ("click", (e:MouseEvent) => mouseDown(e));
                let code = `console.log('lol'); 
                window.addEventListener ("click", function (e){
                        var x = e.x;
                        var y = e.y;
                        console.log('x=' + x + ' y=' + y);
                        this.updateCodeMirror2('clicked at: ' + 'x=' + x + ' y=' + y);
                        //const {ipcRenderer} = require('electron');
                        //var remote = require('remote');
                        //var ipc = remote.require('ipc');
                        //ipc.send("alert-something", 'clicked in borwser at: ' + 'x=' + x + ' y=' + y);   
                });`;
                //webview.executeJavaScript(code); 
                // alert-something
                webview.addEventListener('ipc-message', (event: any) => {
                    console.log(event.channel)
                    updateCodeMirror(event.channel);
                  })
                //webview.send('alert-something' , {msg:'hello from main process'});
                 
        })
        
    }

function mouseDown(event: MouseEvent) {
    console.log('dfgdfgjij');
    var x: number = event.x;
    var y: number = event.y;
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

 ipcRenderer.on("alert-something",function(data:any){
     console.log("recived something");
        updateCodeMirror(data);
    });

  