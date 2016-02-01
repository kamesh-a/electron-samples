var webview = document.createElement('webview');
webview.src = 'http://www.oauthlogin.com/home.php';
webview.partition = 'persist:sessioncheck';

onload = function(){
	document.body.appendChild(webview);
}