var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({});
    mainWindow.loadUrl('file://' + __dirname + '/win_renderer_behaviour_crash.html');
    mainWindow.maximize();
    mainWindow.openDevTools();

    mainWindow.webContents.on('dom-ready', function() {
        mainWindow.send('ElectronIPCMessage', {
            eType: 'dom-ready',
            source: 'main'
        });
    });

    mainWindow.on('crashed', function() {
        /**
         * Successful detection
         * we might include snapshot to restore
         * the data / state of app.
         */
        mainWindow.reload();
        /**
         * Informational message to browser
         * window, we are unable to hook
         * main process js with node-inspector
         * so. just a small workaround to getinformation
         * to print.
         */
        mainWindow.webContents.on('did-finish-load', function() {
            mainWindow.send('ElectronIPCMessage', {
                eType: 'Crashed',
                source: 'main'
            });

            mainWindow.send('ElectronIPCMessage', {
                eType: 'Reloaded',
                source: 'main'
            });
        });
    });
});