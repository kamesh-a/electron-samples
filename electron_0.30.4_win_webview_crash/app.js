onload = function() {
    document.querySelector('#withoutWebview').onclick = function(){
    	/**
    	 * a.Crash the renderer
    	 * application will reload based on detection.
    	 */
    	process.crash();
    };

    document.querySelector('#withWebview').onclick = function(){
    	/**
    	 * a. Embed an dummy webview
    	 * b. crash the renderer
    	 */
    	var google = document.createElement('webview');
    	google.src = 'http://google.com';
    	document.querySelector('#webviewHolder').appendChild(google);

    	google.addEventListener('did-finish-load', function(e){
    		app.log('Webview is Embedded, simulating crash in 5 seconds !!');	
    		app.write('Webview is Embedded, simulating crash in 5 seconds !!');	
    		setTimeout(process.crash,5000);
    	});
    };
}

var ipc = require('ipc');

var app = {
    name: 'RenderBehaviourApp',
    log: function() {
        var tmp = [];
        for (var i = arguments.length - 1; i >= 0; i--) {
            tmp[i] = arguments[i];
        };
        tmp.splice(0, 0, '[' + this.name + '] : ');
        console.debug.apply(console, tmp);
    },
    write : function( txt ){
    	var p = document.createElement('p')
    	p.innerHTML = txt;
    	document.querySelector('#console').appendChild(p)
    },
    msgHandler: function(msg) {
        this.log('Message recieved : ', msg);
        if (msg && msg.eType) {
            switch (msg.eType) {
                case "crashed":
                    {
                        this.log('Application was crashed and restored back');
                        break;
                    }
                default:
                    break;
            }
        }
    }
};

ipc.on('ElectronIPCMessage', app.msgHandler.bind(app));



