(function(R) {
    var domain = location.host || location.href;
    console.debug('Domain :' + domain);
    var ipc = require('ipc');
    app = {
        require: require, // ipc
        process: process,
        module: module,
        Buffer: Buffer,
        setImmediate: setImmediate,
        clearImmediate: clearImmediate,
        ipc: {
            isValid: function(dataObj) {
                return dataObj && typeof dataObj == 'object';
            },
            receive: function(message) {
                /**
                 *
                 * Upon receiving a message, we are dispatching
                 * the message on custom event on window.
                 *
                 * window object can capture the message and take
                 * actions on that.
                 *
                 **/
                // console.debug('Recieved Message on WebApplication :: ', message, ', typeof message : ' + typeof message);
                if (message && typeof message == 'object') {
                    window.dispatchEvent(new CustomEvent('ElectronMessage', {
                        detail: message
                    }))
                }
            }
        }
    };

    function getProtoInfo(obj) {
        var keys = (obj) ? Object.getOwnPropertyNames(obj) : [];
    }

    function callback(message) {
        var msg = message.detail;
        var keys = Object.getOwnPropertyNames(msg);
        var tmp = []
        console.log("Keys : ", keys); // NOTE and empty string key.
        console.warn('Empty key is the issue !!!!!! , when our logging mechanims catch it in prototype chain , crashes webview ');
        for (var index in keys) {
            getProtoInfo(msg[keys[index]]);
        }
    }

    window.addEventListener("ElectronMessage", callback);

    console.debug('IPC Message Registration Success..');
    ipc.on('webapp-msg', app.ipc.receive);
    ipc.on('webapp-init', app.ipc.receive);

})(window);