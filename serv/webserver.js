var express = require('express');
var ws = require('ws');
var gpiop = require("onoff").Gpio;
const sensor = require('ds18b20-raspi');
//const r1wt = require('raspi-1wire-temp');
//const devices = r1wt.findDevices();
//console.log(devices);
// temp sensors setup
const tempsensor1 = '28-00000656814a';
const tempsensor2 = '28-000006703dc3';


// general package setup 
var app = express();
app.use(express.static('public')); // only serve files from ./public 

// first we will setup the websockets server =================
var wsServer = new ws.Server({ noServer:true});
wsServer.on('connection', socket => {
	socket.on('message',message=> {
		if(typeof message === "string"){
			if(message === "gpio-pin1-off") {
				//console.log("EYO WE GOT THE PIN OFF COMMAND");
				turnGPIOoff("pin1");
			} else if(message === "gpio-pin1-on") {
				//console.log("EYO WE GOT THE PIN ON COMMAND");
				turnGPIOon("pin1");
			} else {
				console.log('Recieved "' + message + '"" from client');
			}
		}
	});
	var intervalId = setInterval(function() {
	  	var temp1F = sensor.readF(tempsensor1,1);
	  	var temp2F = sensor.readF(tempsensor2,1);

		socket.send("Air " + temp1F + "&deg; F");
		socket.send("Pool " + temp2F + "&deg; F");

	}, 2000);


});


// now setup the express server ==============================
// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Express app listening at http://dannyspitwo:%s', port);
});
server.on('upgrade', (request,socket,head) => {
	wsServer.handleUpgrade(request,socket,head,socket => {
		wsServer.emit('connection',socket,request);
	});
});


// Raspberry pi GPIO pin setup code below ====================
var pin4 = new gpiop(17,'out');
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


// Temperature sensor setup ===============================

