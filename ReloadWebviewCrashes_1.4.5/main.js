var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var http = require('http');
var crashReporter = electron.crashReporter;
crashReporter.start({companyName:'ElectronTester',submitURL: 'http://127.0.0.1:3000/crashreporter'});

app.commandLine.appendSwitch('remote-debugging-port', '9222'); // enabling remote debugging port
app.commandLine.appendSwitch('ignore-certificate-errors', 'true'); // Ignoring certifcate errors to load websites.
// 
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Crash-report collection server
var server = http.createServer(function(req, res) {
    // Handle the uploaded crash report from client here
    // ...
    // Response the crash report id on server to client.
    res.end(getRandomInt(1000, 9999).toString());
});

var mainWindow = null;
app.on('ready', function() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.toggleDevTools();
    mainWindow.show();

    mainWindow.webContents.on('crashed', function() {
        console.warn('Window got crashed reloading browser-window');
        mainWindow.webContents.reloadIgnoringCache();
    });
});

/**
 * Background logs writing
 * system.
 */
var fs = require('fs');
var path = require('path');

var bLog = {
    _basepath: 'backgroundLogs',
    _stream: null,
    getPath: function() {
        return path.join(app.getAppPath(), this._basepath);
    },
    _checkDirectory: function() {
        // Synchronous code in here
        var logsPath = this.getPath();
        if (!fs.existsSync(logsPath)) {
            fs.mkdirSync(logsPath)
        }
    },
    _createStream: function() {
        this._stream = fs.createWriteStream(
            path.join(this.getPath(), Date.now().toString() + '.log'), {
                encoding: 'utf-8',
                mode: 0777,
                flags: 'a'
            }
        );
        return this._stream;
    },
    _getStream: function() {
        if (!this._stream) {
            this._checkDirectory()
            return this._createStream();
        }

        return this._stream;
    },
    write: function() {

        /* Arguments are automatically taken */
        var tmp = [].slice.call(arguments);
        this._getStream()
            .write(
                new Date() + " :: " +
                JSON.stringify(tmp) +
                '\n'
            );
    },
    hook: function() {
        function logHandler() {
            this.write.apply(bLog, arguments);
        };

        var methods = [
            'log', 'debug', 'error', 'warn', 'info'
        ];

        if (console) {
            for (var i = methods.length - 1; i >= 0; i--) {
                console[methods[i]] = logHandler.bind(this);
            };
        }
    }
}

bLog.hook();