var app = require('app');
var BrowserWindow = require('browser-window');
var http = require('http');
var crashReporter = require('crash-reporter');
crashReporter.start({submitUrl: 'http://127.0.0.1:3000/crashreporter'});


var mainWindow = null;
app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadUrl('file://' + __dirname + '/index.html');
    mainWindow.toggleDevTools();
    mainWindow.show();
});
