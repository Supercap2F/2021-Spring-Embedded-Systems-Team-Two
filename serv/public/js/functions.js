// websocket setup code
var client = new WebSocket('ws://dannyspitwo:8000/','pi-protocol');
var serverWaterLevel = 4.5;

client.onerror = function() {
	console.log('Connection Error');
};

client.onopen = function() {
	console.log("WebSocket Client Connected");
	//client.send("Raspberry Pi Zero Connected");
};

client.onclose = function() {
	console.log('Raspberry Pi Zero Disconnected');
}

client.onmessage = function(e) {
	if (typeof e.data === 'string') {
		if(e.data.indexOf("Pool") > -1 ) {
			document.getElementById("heat").innerHTML = e.data;
		} else if(e.data.indexOf("Air") > -1 ) {
			document.getElementById("airtemp").innerHTML = e.data;
		} else if(e.data.indexof("wl") > -1) {
			// change the server water level here
			// serverWaterLevel = 
			// call the function that updates the GUI
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