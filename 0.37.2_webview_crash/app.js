const ipcRenderer = require('electron').ipcRenderer;

onload = function() {

    var google = document.createElement('webview');
    google.src = 'http://google.com';
    google.setAttribute('preload', 'preload.js');
    google.style.height = screen.availHeight + 'px';
    document.querySelector('#webviewHolder').appendChild(google);

    document.querySelector('#crash').onclick = function() {
        document.querySelector('webview').send('webapp-msg', {
            'name': 'init'
        })
    }
};