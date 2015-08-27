var remote = require('remote');
var currentWindow = remote.getCurrentWindow();
var shell = require('shell');

function imagePreview(lSrc) {
    document.querySelector('img').src = lSrc;
}

function log(txt, isError) {
    var lDom = document.createElement('span');
    lDom.innerHTML = txt;
    isError ? lDom.style.color = 'red' : false;
    document.querySelector('div').appendChild(lDom);
    document.querySelector('div').appendChild(document.createElement('br'));
}

function captureImage() {
    currentWindow.capturePage(function(nativeImage) {
        /* Resuming Back to current Window */
        currentWindow.show();
        currentWindow.focus();

        if (nativeImage.isEmpty()) {
            log('Failure :');
            log('Is NativeImage Empty : ' + nativeImage.isEmpty(), true);
            log('DataURI not well formed : ' + nativeImage.toDataUrl(), true);
            imagePreview('');
            return;
        }
        log('Success :');
        log('	- Image Capture success : ' + !nativeImage.isEmpty());
        log('	- Embedding data url to img tag');
        imagePreview(nativeImage.toDataUrl());
    });
}

onload = function() {
    log('Note : ');
    log('a. Event loop is somehow slown down, tick/Interval won\'t kick in properly < 0.30.6');
    log('b. In windows ELECTRON is able to capture image in all three states background, visible, hidden');

    document.querySelector('#visible').onclick = function() {
        /*
			Application is visible
			image capture will work.
		 */
        captureImage();
    };

    document.querySelector('#background').onclick = function() {
        /*
			Application is visible
			image capture will be
			empty.

			simulate the background
		 */
        log('========= Simulation App In Background ===========');

        shell.openExternal('https://github.com/atom/electron');
        setTimeout(captureImage, 2000);
    }

    document.querySelector('#hidden').onclick = function() {
        /*
			Application is visible
			image capture will be
			empty.

			simulate the background
		 */
        log('========= Simulation App is Hidden ===========');
        currentWindow.hide();
        setTimeout(captureImage, 2000);
    }
}