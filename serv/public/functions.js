// websocket setup code
var client = new WebSocket('ws://localhost:8000/','echo-protocol');

client.onerror = function() {
	console.log('Connection Error');
};

client.onopen = function() {
	console.log("WebSocket Client Connected");

	function sendNumber() {
		if(client.readyState === client.OPEN) {
			var number = Math.round(Math.random() * 0xFFFFFF);
			client.send(number.toString());
			//setTimeout(sendNumber, 1000);
		}
	}

	sendNumber();
};

client.onclose = function() {
	console.log('echo-protocol Client Closed');
}

client.onmessage = function(e) {
	if (typeof e.data === 'string') {
		console.log("Received: '" + e.data + "'");
	}
}

// menu functionality code

function changeMenu(callingElement) {
	var mainmenu = document.getElementById("mainmenu");
	var heatingmenu = document.getElementById("heatingmenu");
	var filtermenu = document.getElementById("filtermenu");
	var lightmenu = document.getElementById("lightmenu");
	var moremenu = document.getElementById("moremenu");

	if(callingElement.id == "heatingmenu-element") {
		mainmenu.style.display = "none";
		heatingmenu.style.display = "block"

		if(client.readyState === client.OPEN) {
			client.send("Client has entered the heating menu");
		}
		
	} else if(callingElement.id == "filtermenu-element") {
		mainmenu.style.display = "none";
		filtermenu.style.display = "block"

	} else if(callingElement.id == "lightmenu-element") {
		mainmenu.style.display = "none";
		lightmenu.style.display = "block"

	} else if(callingElement.id == "moremenu-element") {
		mainmenu.style.display = "none";
		moremenu.style.display = "block"
	} else {
		callingElement.style.display = "none";
		mainmenu.style.display = "block"

		if(client.readyState === client.OPEN) {
			client.send("Back button Pressed");
		}
	}


}