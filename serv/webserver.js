var express = require('express');
var app = express();
var WebSocketServer = require('websocket').server;

app.use(express.static('public'));

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})

// =============================================================
// websockets setup under this line 
wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

function originIsAllowed(origin) {
	// put logic here to detech whether the speicified origin is allowed
	return true;
}

// this code simply echos anything sent to the server
wsServer.on('request',function(request){
	if(!originIsAllowed(request.origin)) {
		// make sure we only accept requests from allowed origins
		request.reject();
		console.log((new Date())+ ' Connection from origin ' + request.origin + ' rejected.');
		return;
	}

	var connection = request.accept(('echo-protocol'), request.origin);
	console.log((new Date()) + ' Connection accpeted.');
	connection.on('message', function(message) {
		if(message.type === 'utf8') {
			console.log(('Recieved Message: ') + message.utf8Data);
			connection.sendUTF(message.utf8Data);
		}
		else if(message.type === 'binary') {
			console.log('Recieved Binary Message of ' + message.binaryData.length + ' bytes');
			connection.sendBytes(message.binaryData);
		}
	});

});

