/*

TODO : to show suggestion 
" Dynamic Context Menu "

*/

var remote = require('remote');
var Menu = remote.require('menu');
var MenuItem = remote.require('menu-item');

var mouseMenu = new Menu();
mouseMenu.append(new MenuItem({
    label: 'Cut',
    accelerator: 'CommandOrControl+X',
    click: function(evt) {
        util.mouse.execute('cut');
    }
}));

mouseMenu.append(new MenuItem({
    type: 'separator'
}));

mouseMenu.append(new MenuItem({
    label: 'Copy',
    accelerator: 'CommandOrControl+C',
    click: function(event) {
        util.mouse.execute('copy');
    }
}));

mouseMenu.append(new MenuItem({
    label: 'Paste',
    accelerator: 'CommandOrControl+V',
    click: function() {
        util.mouse.execute('paste');
    }
}));

function testFunction(e) {
    e.preventDefault();
    mouseMenu.popup(remote.getCurrentWindow());
}

window.addEventListener('contextmenu', testFunction, false);