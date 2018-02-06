//var remote = require('remote');
//var ipc = remote.require('ipc');
var ipcRenderer = require('electron').ipcRenderer;
var kdtamap = require("./kdtamap");
console.log("preload");
function updateCodeMirror2(data) {
    console.log("haha: " + data);
}
var rightClickPosition = null;
window.addEventListener("click", function (e) {
    var x = e.x;
    var y = e.y;
    console.log('x=' + x + ' y=' + y);
    var target = e.target || e.srcElement;
    var id = e.target.getAttribute('id');
    var elementclass = e.target.getAttribute('class');
    var elementhref = e.target.getAttribute('href');
    updateCodeMirror2('clicked at: ' + 'x=' + x + ' y=' + y);
    //const {ipcRenderer} = require('electron');
    //var remote = require('remote');
    //var ipc = remote.require('ipc');
    ipcRenderer.sendToHost(target + kdtamap.click() + ' ' + 'x=' + x + ' y=' + y + ' - id: ' + id + ' class: ' + elementclass + ' href: ' + elementhref);
});
window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("TO DO: Context Menu :D");
}, false);
function targetInfo(target) {
}
window.addEventListener("keypress", function (e) {
    ipcRenderer.sendToHost('enterd: ' + e.key);
});
//# sourceMappingURL=inspector.js.map