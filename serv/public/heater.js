
window.addEventListener('load', function () {
	document.getElementById("weekly-checkbox").onclick = removeCalendar;
	document.getElementById("daily-checkbox").onclick = removeCalendar;

	removeCalendar();
});


function removeCalendar() {
	if(document.getElementById("daily-checkbox").checked) {
		document.getElementById("weekdays-table").style.display = "none";
		document.getElementById("day-table").style.display = "block";
	} else {
		document.getElementById("weekdays-table").style.display = "block";
		document.getElementById("day-table").style.display = "none";
	}
};



var startTime = 8;
var startPMorAM = "AM";
var realStartTime = 8;

var endTime = 8;
var endPMorAM = "AM";
var realEndTime = 8;

var heater = {
	"temp":70,
	"currentDay":1,
	"DorW":false
}


function weeklyScheduleClick(i) {
	heater.currentDay = i;
	console.log(i);
	changeHeaterSettings("dayset");
}


function changeHeaterSettings(calling) {
		// settings for the start time
		if(calling == 'uptime1') {
			startTime++;
			if(startTime == 24) {
				startTime = 0;
			}
		} else if(calling == 'downtime1') {
			startTime--;
			if(startTime == -1) {
				startTime = 23;
			}
		}
		// convert the time to 12 hour clock
		if(startTime > 12) {
			realStartTime = startTime - 12;
			startPMorAM = "PM";
		} else if(startTime == 12) {
			realStartTime = 12;
			startPMorAM = "PM";
		} else if(startTime == 0) {
			realStartTime = 12;
			startPMorAM = "AM";
		} else {
			realStartTime = startTime;
			startPMorAM = "AM";
		}

		// settings for the end time
		if(calling == 'uptime2') {
			endTime++;
			if(endTime == 24) {
				endTime = 0;
			}

		} else if(calling == 'downtime2') {
			endTime--;
			if(endTime == -1) {
				endTime = 23;
			}
		}
		// convert the time to 12 hour clock
		if(endTime > 12) {
			realEndTime = endTime - 12;
			endPMorAM = "PM";
		} else if(endTime == 12) {
			realEndTime = 12;
			endPMorAM = "PM";
		} else if(endTime == 0) {
			realEndTime = 12;
			endPMorAM = "AM";
		} else {
			realEndTime = endTime;
			endPMorAM = "AM";
		}

		// temperature settings
		if(calling == 'uptemp') {
			heater.temp++;
			if(heater.temp == 91) {
				heater.temp = 90;
			}
		} else if(calling == 'downtemp') {
			heater.temp--;
			if(heater.temp == 59) {
				heater.temp = 60;
			}
		}

		document.getElementById("starttime").innerHTML = realStartTime + ":00 " + startPMorAM;
		document.getElementById("endtime").innerHTML = realEndTime + ":00 " + endPMorAM;
		document.getElementById("heatertemp").innerHTML = heater.temp + " &deg;";

		// this portion controls the date that is selected
		if(document.getElementById("weekly-checkbox").checked) {
			heater.DorW = true;
			var alldays = document.getElementsByClassName("weekdays-day");
			for(var i = 0; i < alldays.length; i++) {
				alldays[i].style.backgroundColor = "transparent";
				alldays[i].style.color = "white";
			}

			document.getElementById("weekdays-day" + heater.currentDay.toString()).style.backgroundColor = "white";
			document.getElementById("weekdays-day" + heater.currentDay.toString()).style.color = "#1c99e4";

		} else {
			heater.DorW = false;



		}

		// this portion controls sending data to the server
		if(calling == "save") {
			if(endTime > startTime) {
					client.send("ht:" + startTime + " " + endTime + " " + heater.temp + " " + heater.DorW + " " + heater.currentday);
					console.log("ht:" + startTime + " " + endTime + " " + heater.temp);
			} else {
				console.log("End time cannot be less than start time");
			}
		}


}

