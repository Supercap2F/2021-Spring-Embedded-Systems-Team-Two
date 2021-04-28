window.addEventListener('load', function () {
	document.getElementById("weekly-checkbox").onclick = removeCalendar;
	document.getElementById("daily-checkbox").onclick = removeCalendar;

	removeCalendar();
});

var startTime = 8;
var startPMorAM = "AM";
var realStartTime = 8;

var endTime = 8;
var endPMorAM = "AM";
var realEndTime = 8;

var heater = {
	"temp":70,
	"temp2": 70,
	"currentDay":1,
	"DorW":false
}

function removeCalendar() {
	if(document.getElementById("daily-checkbox").checked) {
		document.getElementById("weekdays-table").style.display = "none";
		document.getElementById("day-table").style.display = "block";
		heater.currentDay = 8;
	} else {
		document.getElementById("weekdays-table").style.display = "block";
		document.getElementById("day-table").style.display = "none";
		heater.currentDay = 1;
	}
};

function requestDayData() {
	// this function requests that the server send us new day data from its database


}

function dayDataRecieved() {
	// this will get called when the functions js file recieves the correct commmand
	// put code in here to update the day that the user is on to the new data

}



function weeklyScheduleClick(i) {
	heater.currentDay = i;
	console.log(i);
	changeHeaterSettings("dayset");
}


// this function is called whenever the user clicks either the button
// that makes the temp/time go up or down or the save button
function changeHeaterSettings(calling) {
		// wait until the database has been loaded
		if(!DBrecievedFlag) {
			document.getElementById("starttime").innerHTML = "--";
			document.getElementById("endtime").innerHTML = "--";
			document.getElementById("heatertemp").innerHTML = "--";
			document.getElementById("heatertemp2").innerHTML = "--";
			return;
		}
		// figure out what the proper database element is
		switch(heater.currentDay) {
			case 1:
				startTime = databaseSchedule.sun.start_time;
				endTime = databaseSchedule.sun.end_time;
				heater.temp = databaseSchedule.sun.start_temp;
				heater.temp2 = databaseSchedule.sun.end_temp;
				break;
			case 2:
				startTime = databaseSchedule.mon.start_time;
				endTime = databaseSchedule.mon.end_time;
				heater.temp = databaseSchedule.mon.start_temp;
				heater.temp2 = databaseSchedule.mon.end_temp;
				break;
			case 3:
				startTime = databaseSchedule.tue.start_time;
				endTime = databaseSchedule.tue.end_time;
				heater.temp = databaseSchedule.tue.start_temp;
				heater.temp2 = databaseSchedule.tue.end_temp;
				break;
			case 4:
				startTime = databaseSchedule.wed.start_time;
				endTime = databaseSchedule.wed.end_time;
				heater.temp = databaseSchedule.wed.start_temp;
				heater.temp2 = databaseSchedule.wed.end_temp;
				break;
			case 5:
				startTime = databaseSchedule.thr.start_time;
				endTime = databaseSchedule.thr.end_time;
				heater.temp = databaseSchedule.thr.start_temp;
				heater.temp2 = databaseSchedule.thr.end_temp;
				break;			
			case 6:
				startTime = databaseSchedule.fri.start_time;
				endTime = databaseSchedule.fri.end_time;
				heater.temp = databaseSchedule.fri.start_temp;
				heater.temp2 = databaseSchedule.fri.end_temp;
				break;
			case 7:
				startTime = databaseSchedule.sat.start_time;
				endTime = databaseSchedule.sat.end_time;
				heater.temp = databaseSchedule.sat.start_temp;
				heater.temp2 = databaseSchedule.sat.end_temp;
				break;
			case 8:
				startTime = databaseSchedule.day.start_time;
				endTime = databaseSchedule.day.end_time;
				heater.temp = databaseSchedule.day.start_temp;
				heater.temp2 = databaseSchedule.day.end_temp;
				break;
		}

		// this code processes the variables based upon what button was pressed
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
		}else if(calling == 'uptemp2') {
			heater.temp2++;
			if(heater.temp2 == 91) {
				heater.temp2 = 90;
			}
		} else if(calling == 'downtemp2') {
			heater.temp2--;
			if(heater.temp2 == 59) {
				heater.temp2 = 60;
			}
		}

		// put these new numbers into the proper database element
		switch(heater.currentDay) {
			case 1:
				databaseSchedule.sun.start_time =startTime;
				databaseSchedule.sun.end_time = endTime;
				databaseSchedule.sun.start_temp = heater.temp;
				databaseSchedule.sun.end_temp = heater.temp2;
				break;
			case 2:
				databaseSchedule.mon.start_time =startTime;
				databaseSchedule.mon.end_time = endTime;
				databaseSchedule.mon.start_temp = heater.temp;
				databaseSchedule.mon.end_temp = heater.temp2;
				break;
			case 3:
				databaseSchedule.tue.start_time =startTime;
				databaseSchedule.tue.end_time = endTime;
				databaseSchedule.tue.start_temp = heater.temp;
				databaseSchedule.tue.end_temp = heater.temp2;
				break;
			case 4:
				databaseSchedule.wed.start_time =startTime;
				databaseSchedule.wed.end_time = endTime;
				databaseSchedule.wed.start_temp = heater.temp;
				databaseSchedule.wed.end_temp = heater.temp2;
				break;
			case 5:
				databaseSchedule.thr.start_time =startTime;
				databaseSchedule.thr.end_time = endTime;
				databaseSchedule.thr.start_temp = heater.temp;
				databaseSchedule.thr.end_temp = heater.temp2;
				break;			
			case 6:
				databaseSchedule.fri.start_time =startTime;
				databaseSchedule.fri.end_time = endTime;
				databaseSchedule.fri.start_temp = heater.temp;
				databaseSchedule.fri.end_temp = heater.temp2;
				break;
			case 7:
				databaseSchedule.sat.start_time =startTime;
				databaseSchedule.sat.end_time = endTime;
				databaseSchedule.sat.start_temp = heater.temp;
				databaseSchedule.sat.end_temp = heater.temp2;
				break;
			case 8:
				databaseSchedule.day.start_time =startTime;
				databaseSchedule.day.end_time = endTime;
				databaseSchedule.day.start_temp = heater.temp;
				databaseSchedule.day.end_temp = heater.temp2;
				break;
		}

		// display the values
		document.getElementById("starttime").innerHTML = realStartTime + ":00 " + startPMorAM;
		document.getElementById("endtime").innerHTML = realEndTime + ":00 " + endPMorAM;
		document.getElementById("heatertemp").innerHTML = heater.temp + " &deg;";
		document.getElementById("heatertemp2").innerHTML = heater.temp2 + " &deg;";

		// this portion controls the date that is selected
		if(document.getElementById("weekly-checkbox").checked) {
			heater.DorW = true;
			try {
				var alldays = document.getElementsByClassName("weekdays-day");
				for(var i = 0; i < alldays.length; i++) {
					alldays[i].style.backgroundColor = "transparent";
					alldays[i].style.color = "white";
				}
				document.getElementById("weekdays-day" + heater.currentDay.toString()).style.backgroundColor = "white";
				document.getElementById("weekdays-day" + heater.currentDay.toString()).style.color = "#1c99e4";
			}catch {}
		} else {
			heater.DorW = false;
		}

		// this portion controls sending data to the server
		if(calling == "save") {
			if(endTime > startTime) {
				switch(heater.currentDay) {
					case 1:
						client.send("sun " + ALS(databaseSchedule.sun.start_time) + " " + ALS(databaseSchedule.sun.end_time) + " " + databaseSchedule.sun.start_temp + " " + databaseSchedule.sun.end_temp);
						break;
					case 2:
						client.send("mon " + ALS(databaseSchedule.mon.start_time) + " " + ALS(databaseSchedule.mon.end_time) + " " + databaseSchedule.mon.start_temp + " " + databaseSchedule.mon.end_temp);
						break;
					case 3:
						client.send("tue " + ALS(databaseSchedule.tue.start_time) + " " + ALS(databaseSchedule.tue.end_time) + " " + databaseSchedule.tue.start_temp + " " + databaseSchedule.tue.end_temp);
						break;
					case 4:
						client.send("wed " + ALS(databaseSchedule.wed.start_time) + " " + ALS(databaseSchedule.wed.end_time) + " " + databaseSchedule.wed.start_temp + " " + databaseSchedule.wed.end_temp);
						break;
					case 5: 
						client.send("thr " + ALS(databaseSchedule.thr.start_time) + " " + ALS(databaseSchedule.thr.end_time) + " " + databaseSchedule.thr.start_temp + " " + databaseSchedule.thr.end_temp);
						break;
					case 6: 
						client.send("fri " + ALS(databaseSchedule.fri.start_time) + " " + ALS(databaseSchedule.fri.end_time) + " " + databaseSchedule.fri.start_temp + " " + databaseSchedule.fri.end_temp);
						break;
					case 7: 
						client.send("sat " + ALS(databaseSchedule.sat.start_time) + " " + ALS(databaseSchedule.sat.end_time) + " " + databaseSchedule.sat.start_temp + " " + databaseSchedule.sat.end_temp);
						break;
					case 8:
						client.send("day " + ALS(databaseSchedule.day.start_time) + " " + ALS(databaseSchedule.day.end_time) + " " + databaseSchedule.day.start_temp + " " + databaseSchedule.day.end_temp);
						break;

				}
				client.send("save");
			} else {
				console.log("End time cannot be less than start time");
			}
		}

}


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
