var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
const ipcMain = require('electron').ipcMain;
var mainWindow = null;

app.commandLine.appendSwitch('remote-debugging-port', '8888'); // enabling remote debugging port

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadUrl('file://' + __dirname + '/webview_crash_on_ipc.html');
    mainWindow.maximize();
});
