var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var win= null;
app.on('ready', function() {
  win = new BrowserWindow({width: 1000, height: 700});
  win.loadURL('file://' + __dirname + '/testDownload.html');
  win.openDevTools();
});
