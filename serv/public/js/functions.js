// websocket setup code
var client = new WebSocket('ws://dannyspitwo:8000/','pi-protocol');
var serverWaterLevel = 4.5;
var DBrecievedFlag = 0;

var databaseSchedule = {
	mon: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	tue: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	wed: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	thr: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	fri: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	sat: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	sun: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	},
	day: {
		start_time: 0,
		end_time: 0,
		start_temp: 0,
		end_temp: 0
	}
};

client.onerror = function() {
	console.log('Connection Error');
};

client.onopen = function() {
	console.log("WebSocket Client Connected");
	//client.send("Raspberry Pi Zero Connected");
	client.send("request-schedule");
};

client.onclose = function() {
	console.log('Raspberry Pi Zero Disconnected');
}

client.onmessage = function(e) {
	if (typeof e.data === 'string') {
		if(e.data.indexOf("Pool") > -1 ) {
			document.getElementById("heat").innerHTML = e.data;
			document.getElementById("pool-water-temp").innerHTML = e.data.slice(5);



		} else if(e.data.indexOf("Air") > -1 ) {
			document.getElementById("airtemp").innerHTML = e.data;
			document.getElementById("air-temp").innerHTML = e.data.slice(4);



		} else if(e.data.indexOf("wl") > -1) {
			// change the server water level here
			// serverWaterLevel = 
			// call the function that updates the GUI
			serverWaterLevel = (parseInt(e.data.slice(4),10)/255) * 9;
			updateServerWaterLevel();
			//console.log(e.data);

		} else if (e.data.indexOf("pH") > -1) {
			// change the pool ph level here
			document.getElementById("pool-ph").innerHTML = e.data;

		// the stuff under here is in charge of parsing the database entries recieved 
		} else if(e.data.indexOf("mon ") > -1) {
			databaseSchedule.mon.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.mon.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.mon.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.mon.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);

		} else if(e.data.indexOf("tue ") > -1) {
			databaseSchedule.tue.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.tue.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.tue.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.tue.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);

		} else if(e.data.indexOf("wed ") > -1) {
			databaseSchedule.wed.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.wed.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.wed.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.wed.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);
			
		} else if(e.data.indexOf("thr ") > -1) {
			databaseSchedule.thr.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.thr.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.thr.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.thr.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);
			
		} else if(e.data.indexOf("fri ") > -1) {
			databaseSchedule.fri.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.fri.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.fri.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.fri.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);
			
		} else if(e.data.indexOf("sat ") > -1) {
			databaseSchedule.sat.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.sat.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.sat.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.sat.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);
			
		} else if(e.data.indexOf("sun ") > -1) {
			databaseSchedule.sun.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.sun.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.sun.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.sun.end_temp = parseInt(e.data.slice(17,19));
			console.log(e.data);
			
		} else if(e.data.indexOf("day ") > -1) {
			databaseSchedule.day.start_time = parseInt(e.data.slice(4,8));
			databaseSchedule.day.end_time = parseInt(e.data.slice(9,13));
			databaseSchedule.day.start_temp = parseInt(e.data.slice(14,16));
			databaseSchedule.day.end_temp = parseInt(e.data.slice(17,19));
			DBrecievedFlag = 1;
			console.log(e.data);
		}
	}
}

// menu functionality code
function changeMenu(callingElement) {
	var mainmenu = document.getElementById("mainmenu");
	var heatingmenu = document.getElementById("heatingmenu");
	var filtermenu = document.getElementById("filtermenu");
	var lightmenu = document.getElementById("lightmenu");
	var watermenu = document.getElementById("watermenu");

	if(callingElement.id == "heatingmenu-element") {
		mainmenu.style.display = "none";
		heatingmenu.style.display = "block"
		weeklyScheduleClick(8);

	} else if(callingElement.id == "filtermenu-element") {
		mainmenu.style.display = "none";
		filtermenu.style.display = "block"

	} else if(callingElement.id == "lightmenu-element") {
		mainmenu.style.display = "none";
		lightmenu.style.display = "block"

	} else if(callingElement.id == "watermenu-element") {
		mainmenu.style.display = "none";
		watermenu.style.display = "block"
	} else {
		callingElement.style.display = "none";
		mainmenu.style.display = "block"

		if(client.readyState === client.OPEN) {
			//client.send("Back button Pressed");
		}
	}
}

var toggleflag = false;
function sendGPIOcode() {
	if(toggleflag) {
		toggleflag = false;
		client.send("gpio-pin1-off");
	} else {
		toggleflag = true;
		client.send("gpio-pin1-on");
	}
}