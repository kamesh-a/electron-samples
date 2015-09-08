var remote = require('remote');
var currentWindow = remote.getCurrentWindow();
var shell = require('shell');

function log(txt, isError) {
    var lDom = document.createElement('span');
    lDom.innerHTML = txt;
    isError ? lDom.style.color = 'red' : false;
    document.querySelector('div').appendChild(lDom);
    document.querySelector('div').appendChild(document.createElement('br'));
}

onload = function() {
    log('SessionNotPersisting Sample App');
}