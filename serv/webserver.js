var express = require('express');
var ws = require('ws');
var gpiop = require("onoff").Gpio;
const sensor = require('ds18b20-raspi');
const SPI = require('pi-spi');
fs = require('fs');

// local database stuff
var database;
var database2;
fs.readFile('./database.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  database = JSON.parse(data);
});
fs.readFile('./databaseFilter.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  database2 = JSON.parse(data);
});



function saveDatabase() {
	var fileData = JSON.stringify(database);
	fs.writeFile('./database.json', fileData, function (err) {
		  if (err) throw err;
		  console.log('Saved database!');
	});
}

function saveDatabase2() {
	var fileData = JSON.stringify(database2);
	fs.writeFile('./databaseFilter.json', fileData, function (err) {
		  if (err) throw err;
		  console.log('Saved database2!');
	});
}



// temp sensors setup
const tempsensor1 = '28-00000656814a';
const tempsensor2 = '28-000006703dc3';

// general package setup 
var app = express();
app.use(express.static('public')); // only serve files from ./public 
var setWaterLevel = 0;

// first we will setup the websockets server =================
var wsServer = new ws.Server({ noServer:true});
wsServer.on('connection', socket => {
	socket.on('message',message=> {
		if(typeof message === "string"){
			if(message === "request-schedule") {
				sendSchedule(socket);

			// this handels saving data to the server
			} else if(message.indexOf("mon ") > -1) {
				database.mon = message;
			} else if(message.indexOf("tue ") > -1) {
				database.tue = message;
			} else if(message.indexOf("wed ") > -1) {
				database.wed = message;
			} else if(message.indexOf("thr ") > -1) {
				database.thr = message;
			} else if(message.indexOf("fri ") > -1) {
				database.fri = message;
			} else if(message.indexOf("sat ") > -1) {
				database.sat = message;
			} else if(message.indexOf("sun ") > -1) {
				database.sun = message;
			} else if(message.indexOf("day ") > -1) {
				database.day = message;
			} else if(message.indexOf("fay ") > -1) {
				database2.fay = message;
			}else if(message.indexOf("save") > -1) {
				saveDatabase();
			} else if(message.indexOf("sav2") > -1) {
				saveDatabase2();
			}

			// if the message is the water level
			else if(message.indexOf('sl ') > -1) {
				setWaterLevel = parseInt(message.slice(3));
			} else {
				console.log('Recieved "' + message + '"" from client');
			}
		}
	});
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
var pin17 = new gpiop(17,'out');
var pin27 = new gpiop(27,'out');
function turnGPIOon(pin) {
	if(pin === 'pin17'){
		pin17.writeSync(1);
	} else if(pin == 'pin27') {
		pin27.writeSync(1);
	}
}
function turnGPIOoff(pin) {
	if(pin === 'pin17'){
		pin17.writeSync(0);
	} else if(pin =='pin27') {
		pin27.writeSync(0);
	}
}


// Ph and Water level sensor setup
spi = SPI.initialize("/dev/spidev0.0");

// An SPI message is an array of one or more read+write transfers
// data to start transfer
// 0000 - four zeros
// 1   - start bit
// 1   - select two channel mode
// 0/1 - channel 1/2
// 1   - MSB first
// the LTC now has control but there is a null clock cycle
//  - imediatly switch to input mode
message =  Buffer.from([0b00011110]);
message2 = Buffer.from([0b00011010]);

var waterLevel = 0;
var airTemp = 0;
var poolTemp = 0;

spi.clockSpeed(20000);
var intervalId2 = setInterval(function() {
	wsServer.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {

		// this should be for channel 0
		spi.transfer(message, 2, function (e,d) {
	    	if (e) console.error(e);
	    	else {
				//console.log("Got \""+ d[1] +"\" back.");
				client.send("wl: " + d[1]);
				waterLevel = d[1];
				if(waterLevel <= setWaterLevel) {
					turnGPIOon('pin17');
				} else {
					turnGPIOoff('pin17');
				}
	    	} 

		});

	    // this should be for channel 1
		spi.transfer(message2, 2, function (e,d) {
	    	if (e) console.error(e);
	    	else {
				//console.log("Got \""+ d[1] +"\" back.");
				var ph = (1-((d[1])/255)) * 14;
				client.send("pH " + ph.toFixed(1));
	    	} 
		});
	  	airTemp = sensor.readF(tempsensor1,1);
	  	poolTemp = sensor.readF(tempsensor2,1);
		client.send("Air " + airTemp + "&deg; F");
		client.send("Pool " + poolTemp + "&deg; F");
		client.send("filon  " + filteron);
		client.send("filoff " + filteroff);
      }
  });
}, 500);


// the below code handels the database operations & scheduling
function sendSchedule(sock) {
	sock.send(database.mon);
	sock.send(database.tue);
	sock.send(database.wed);
	sock.send(database.thr);
	sock.send(database.fri);
	sock.send(database.sat);
	sock.send(database.sun);
	sock.send(database.day);
	sock.send(database2.fay);
}

// function adds leading space if needed
function ALS(number) {
	var finalstring;
	if(number.toString().length == 3) {
		finalstring = " " + number.toString();
	} else if(number.toString().length == 2) {
		finalstring = "  " + number.toString();
	} else if(number.toString().length == 1) {
		finalstring = "   " + number.toString();
	} else {
		finalstring = number.toString();
	}

	return finalstring;
}


// this code controls turning on the heater to keep the pool at the set level
var intervalId3 = setInterval(function() {
	var d = new Date();

	if(d.getHours() >= parseInt(database.day.slice(6,8)) && d.getHours() <= parseInt(database.day.slice(11,13))) {
		if(poolTemp < parseInt(database.day.slice(14,16)) ) {
			turnGPIOon('pin27');
		} else {
			turnGPIOoff('pin27');
		}
	} else {
		if(poolTemp < parseInt(database.day.slice(17)) ) {
			turnGPIOon('pin27');
		} else {
			turnGPIOoff('pin27');
		}
	}
}, 500);


// this code controls the filter time stuff
var filteron = 0;
var filteroff = 0;

var intervalId4 = setInterval(function() {
	if(parseInt(database2.fay.slice(14,16)) == 1) {
		// the filter is enabled
		var d = new Date();
		// the time is correct
		if(d.getHours() >= parseInt(database2.fay.slice(6,8)) && d.getHours() <= parseInt(database2.fay.slice(11,13))) {
			filteron++;
		} else {
			filteroff++;
		}
	} else {
		filteroff++;
	}
}, 60000); // every minute



