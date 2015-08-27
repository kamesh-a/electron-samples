var remote =  require('remote');
var currentWindow = remote.getCurrentWindow();
var shell = require('shell');

function imagePreview( lSrc ){
	document.querySelector('img').src = lSrc;
}

function log( txt , isError ){
	var lDom = document.createElement('span');
	lDom.innerHTML = txt;
	isError ? lDom.style.color = 'red' :  false;
	document.querySelector('div').appendChild(lDom);
	document.querySelector('div').appendChild(document.createElement('br'));
}

function captureImage(){
	currentWindow.capturePage(function( nativeImage ){
		if( nativeImage.isEmpty() ){
			log('==== Failure ====');
			log('Is NativeImage Empty : '+nativeImage.isEmpty() , true );
			log('DataURI : '+nativeImage.toDataUrl() , true ); 
			imagePreview('');

			/* Resuming Back to current Window */
			currentWindow.show();
			currentWindow.focus();
			return;
		}
		log('==== success ====');
		log('Image Capture success : '+nativeImage.isEmpty());
		imagePreview(nativeImage.toDataUrl());
	});
}

onload = function(){
	document.querySelector('#visible').onclick = function(){
		/*
			Application is visible
			image capture will work.
		 */
		captureImage();
	};

	document.querySelector('#background').onclick = function(){
		/*
			Application is visible
			image capture will be
			empty.

			simulate the background
		 */
		log('========= Simulation ===========');
		log('Application need go in background for simulation purpose , takes 3 sec');
		log('Note :  Event loop is somehow slown down, timeout won\'t kick in properly',true);
		shell.openExternal('https://github.com/atom/electron');
		setTimeout(captureImage,2000);
	}
}