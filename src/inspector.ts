 //var remote = require('remote');
 //var ipc = remote.require('ipc');

const {ipcRenderer} = require('electron')
var kdtamap = require("./kdtamap");
var lastXPath: string = "";
var enterdKeysList: string[] = new Array;
var keyEventTimer: any;


console.log("preload");

function updateCodeMirror2(data: string){
   console.log("haha: " + data);
}

let rightClickPosition: any = null



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
    ipcRenderer.sendToHost(kdtamap.click(createXPathFromElement((e.target as HTMLElement))));   
});

window.addEventListener ("contextmenu", function (e){
    e.preventDefault()
    alert("TO DO: Context Menu :D");
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