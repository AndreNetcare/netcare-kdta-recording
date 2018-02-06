//var remote = require('remote');
//var ipc = remote.require('ipc');
var ipcRenderer = require('electron').ipcRenderer;
console.log("preload");
function updateCodeMirror2(data) {
    console.log("haha: " + data);
}
window.addEventListener("click", function (e) {
    var x = e.x;
    var y = e.y;
    console.log('x=' + x + ' y=' + y);
    updateCodeMirror2('clicked at: ' + 'x=' + x + ' y=' + y);
    //const {ipcRenderer} = require('electron');
    //var remote = require('remote');
    //var ipc = remote.require('ipc');
    ipcRenderer.sendToHost('clicked at: ' + 'x=' + x + ' y=' + y);
});
//# sourceMappingURL=test.js.map