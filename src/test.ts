 //var remote = require('remote');
 //var ipc = remote.require('ipc');
const {ipcRenderer} = require('electron')
console.log("preload");

function updateCodeMirror2(data: string){
   console.log("haha: " + data);
}

window.addEventListener ("click", function (e){
    var x = e.x;
    var y = e.y;
    console.log('x=' + x + ' y=' + y);
    var target = e.target || e.srcElement;
    var id = (e.target as HTMLElement).getAttribute('id');
    var elementclass = (e.target as HTMLElement).getAttribute('class');
    var elementhref = (e.target as HTMLElement).getAttribute('href');
    updateCodeMirror2('clicked at: ' + 'x=' + x + ' y=' + y);
    //const {ipcRenderer} = require('electron');
    //var remote = require('remote');
    //var ipc = remote.require('ipc');
    ipcRenderer.sendToHost(target + ' clicked at: ' + 'x=' + x + ' y=' + y + ' - id: ' + id + ' class: ' + elementclass + ' href: ' + elementhref);   
});

function targetInfo(target: EventTarget){
    
}

window.addEventListener("keypress", function (e){
    
    ipcRenderer.sendToHost('enterd: '  + e.key);   
});