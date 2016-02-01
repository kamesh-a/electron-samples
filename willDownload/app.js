var download = {
    register: function() {
        var win = require('remote').getCurrentWindow();
        var path = require('path');
        var shell = require('shell');
        var session = win.webContents.session;
        console.log('Registering listeners ');
        /* 
         * Default Application's Downloads Path
         * replaced with system Downloads
         */
        session.once('will-download', function(event, item, webContents) {
            /*
             * This will not fire in electron engine v0.35.0 /mac
             *
             */
            console.log('Download Event firing');
            console.log('Received bytes in startup:', item.getReceivedBytes());

            item.on('updated', function() {
                console.log('Receiving bytes in stream: ' + item.getReceivedBytes());
            });

            item.on('done', function(e, state) {
                if (state == "completed") {
                    var pathToFile = path.join(this.getDownloadFolder(), item.getFilename())
                    console.log('Downloaded SuccessFully !!!!! ' + pathToFile);
                }
            }.bind(this));

        });
    }
};

onload = function() {
    download.register();
}