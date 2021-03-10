var express = require('express');
var app = express();
var WebSocketServer = require('websocket').server;
var gpiop = require("onoff").Gpio;

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

	var connection = request.accept(('pi-protocol'), request.origin);
	console.log((new Date()) + ' Connection accpeted.');
	connection.on('message', function(message) {
		if(message.type === 'utf8') {
			if(message.utf8Data === 'gpio-pin1-on') {
				// code here to turn on gpio 1
				turnGPIOon("pin1");
				console.log("gpio pin1 on");
			} else if(message.utf8Data === 'gpio-pin1-off') {
				// code here to turn off gpio 1
				turnGPIOoff("pin1");
				console.log("gpio pin1 off");
			} else {
				console.log(('Recieved Message: ') + message.utf8Data);
			}

		}
		else {
			console.log("Unknown Message type recieved from client");
		}
	});
});



// Raspberry pi GPIO pin setup code below 
var pin4 = new gpiop(4,'out');

function turnGPIOon(pin) {
	if(pin === 'pin1'){
		pin4.writeSync(1);
	}
}

function turnGPIOoff(pin) {
	if(pin === 'pin1'){
		pin4.writeSync(0);
	}
}
