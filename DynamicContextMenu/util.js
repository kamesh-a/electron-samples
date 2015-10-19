var util = {
    name: "utilities",
    log: function() {
        var tmp = Array.prototype.slice.call(arguments);
        if (typeof tmp[0] == 'string') {
            tmp[0] = '[' + this.name + '] : ' + tmp[0];
        } else {
            tmp.splice(0, 0, '[' + this.name + '] : ');
        }
        console.debug.apply(console, tmp);
    }
};

util.mouse = {
    callback: null,
    registerCB: function(fn, context) {
        if (fn && typeof fn == 'function') {
            this.callback = fn;
        }
    },
    execute: function(type) {
        if (this.callback) {
            this.callback.call(null, {
                etype: 'contextmenu',
                action: 'click',
                menu: type
            });
        } else if (type) {
            switch (type) {
                case "cut":
                    {
                        document.querySelector('webview').cut();
                        break;
                    }
                case "copy":
                    {
                        document.querySelector('webview').copy();
                        break;
                    }
                case "paste":
                    {
                        document.querySelector('webview').paste();
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
    }
};

