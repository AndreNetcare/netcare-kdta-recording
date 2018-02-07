 //var remote = require('remote');
 //var ipc = remote.require('ipc');

const {ipcRenderer} = require('electron')
var kdtamap = require("./kdtamap");
var lastXPath: string = "";
var enterdKeysList: string[] = new Array;
var keyEventTimer: any;

var contextmenuHTML: string ="<div style=\"display:none; \"   id=\"contextMenu\">" +
                            "<table  border=\"0\" cellpadding=\"0\" cellspacing=\"0\"" + 
                            "style=\"border: thin solid #808080; cursor: default;\" width=\"100px\" bgcolor=\"White\">"+
                            "<tr><td><div  class=\"ContextItem\">View</div></td></tr>"+
                            "<tr><td ><div  class=\"ContextItem\">Edit</div></td></tr>"+
                            "<tr><td ><div  class=\"ContextItem\">Delete</div></td></tr>"+
                            "</table>";


console.log("preload");

function updateCodeMirror2(data: string){
   console.log("haha: " + data);
}

let rightClickPosition: any = null

window.addEventListener("load", addContextMenuHTML);


window.addEventListener ("click", function (e){
    if(document.getElementById("contextMenu").style.display == 'none'){
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
        ipcRenderer.sendToHost(kdtamap.click(createXPathFromElement((e.target as HTMLElement))));
    }else{
        hideMenu("contextMenu");
    }
       
});

window.addEventListener ("contextmenu", function (e){
    e.preventDefault()
    //alert("TO DO: Context Menu :D");
    showMenu("contextMenu",e)
}, false);

function createXPathFromElement(elm: any) { //TO DO Make more genius 
    var allNodes = document.getElementsByTagName('*'); 
    for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
    { 
        if (elm.hasAttribute('id')) { 
                var uniqueIdCount = 0; 
                for (var n=0;n < allNodes.length;n++) { 
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                    if (uniqueIdCount > 1) break; 
                }; 
                if ( uniqueIdCount == 1) { 
                    segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                    return segs.join('/'); 
                } else { 
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
                } 
        } else if (elm.hasAttribute('class')) { 
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
        } else { 
            for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName)  i++; }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 
    };
    lastXPath =  segs.length ? '/' + segs.join('/') : null;
    return segs.length ? '/' + segs.join('/') : null; 
}; 
// timer = setTimeout(run, 200);
window.addEventListener("keypress", function (e){
    console.log(e.key);
    enterdKeysList.push(String.fromCharCode(e.keyCode));
    if(keyEventTimer != undefined || null){
        clearTimeout(keyEventTimer);
        console.log("timer cleard and stared");
        keyEventTimer = setTimeout(keyEnteredOver, 6000);
    }else{
        console.log("timer stared");
        keyEventTimer = setTimeout(keyEnteredOver, 6000);
    }
     
});

function keyEnteredOver(){
    var str: string = "";
    console.log("done");
    for(var i = 0; i < enterdKeysList.length; i++){
        str += enterdKeysList[i];
    }
    if(lastXPath != undefined || null){
        ipcRenderer.sendToHost(kdtamap.withText(lastXPath, str))
    }
}

function addContextMenuHTML(){

    var htmlbody = document.body;
    console.log(htmlbody);
    htmlbody.insertAdjacentHTML( 'beforeend', contextmenuHTML );
    
}

function showMenu(control: string, e: any) {
    var posx = e.clientX +window.pageXOffset +'px'; //Left Position of Mouse Pointer
    var posy = e.clientY + window.pageYOffset + 'px'; //Top Position of Mouse Pointer
    document.getElementById(control).style.position = 'absolute';
    document.getElementById(control).style.display = 'inline';
    document.getElementById(control).style.left = posx;
    document.getElementById(control).style.top = posy;           
}
function hideMenu(control: string) {

    document.getElementById(control).style.display = 'none'; 
}


