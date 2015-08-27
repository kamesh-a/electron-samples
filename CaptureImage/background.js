var app = require('app');
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.commandLine.appendSwitch('remote-debugging-port', '9222'); // enabling remote debugging port

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadUrl('file://' + __dirname + '/app.html');
    // mainWindow.toggleDevTools();
});
