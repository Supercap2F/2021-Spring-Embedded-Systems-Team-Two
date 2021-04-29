var filter = {
	"startTime":8,
	"startPMorAM":"AM",
	"realStartTime":8,
	"endTime":8,
	"endPMorAM":"AM",
	"realEndTime":8,
	"temp":70,
	"temp2": 70,
	"currentDay":1,
	"DorW":false
}


function changeFilterSettings(calling) {
		// wait until the database has been loaded
		if(!filDBrecievedFlag) {
			document.getElementById("filter-starttime").innerHTML = "--";
			document.getElementById("filter-endtime").innerHTML = "--";
			document.getElementById("filter-temp").innerHTML = "--";
			document.getElementById("filter-temp2").innerHTML = "--";
			return;
		}
		// figure out what the proper database element is
		filter.startTime = databaseSchedule2.fay.start_time;
		filter.endTime = databaseSchedule2.fay.end_time;
		filter.temp = databaseSchedule2.fay.start_temp;
		filter.temp2 = databaseSchedule2.fay.end_temp;

		// this code processes the variables based upon what button was pressed
		// settings for the start time 
		if(calling == 'filter-uptime1') {
			filter.startTime++;
			if(filter.startTime == 24) {
				filter.startTime = 0;
			}
		} else if(calling == 'filter-downtime1') {
			filter.startTime--;
			if(filter.startTime == -1) {
				filter.startTime = 23;
			}
		}
		// convert the time to 12 hour clock
		if(filter.startTime > 12) {
			filter.realStartTime = filter.startTime - 12;
			filter.startPMorAM = "PM";
		} else if(filter.startTime == 12) {
			filter.realStartTime = 12;
			filter.startPMorAM = "PM";
		} else if(filter.startTime == 0) {
			filter.realStartTime = 12;
			filter.startPMorAM = "AM";
		} else {
			filter.realStartTime = filter.startTime;
			filter.startPMorAM = "AM";
		}
		// settings for the end time
		if(calling == 'filter-uptime2') {
			filter.endTime++;
			if(filter.endTime == 24) {
				filter.endTime = 0;
			}
		} else if(calling == 'filter-downtime2') {
			filter.endTime--;
			if(filter.endTime == -1) {
				filter.endTime = 23;
			}
		}
		// convert the time to 12 hour clock
		if(filter.endTime > 12) {
			filter.realEndTime = filter.endTime - 12;
			filter.endPMorAM = "PM";
		} else if(filter.endTime == 12) {
			filter.realEndTime = 12;
			filter.endPMorAM = "PM";
		} else if(filter.endTime == 0) {
			filter.realEndTime = 12;
			filter.endPMorAM = "AM";
		} else {
			filter.realEndTime = filter.endTime;
			filter.endPMorAM = "AM";
		}
		// on / off settings
		if(document.getElementById("filter-onoff").checked == true) {
			filter.temp = 1;
		} else {
			filter.temp = 0;
		}


		// put these new numbers into the proper database element
		databaseSchedule2.fay.start_time = filter.startTime;
		databaseSchedule2.fay.end_time = filter.endTime;
		databaseSchedule2.fay.start_temp = filter.temp;
		databaseSchedule2.fay.end_temp = filter.temp2;

		// display the values
		document.getElementById("filter-starttime").innerHTML = filter.realStartTime + ":00 " + filter.startPMorAM;
		document.getElementById("filter-endtime").innerHTML = filter.realEndTime + ":00 " + filter.endPMorAM;
		//document.getElementById("filter-temp").innerHTML = filter.temp + " &deg;";
		//document.getElementById("filter-temp2").innerHTML = filter.temp2 + " &deg;";


		// this portion controls sending data to the server
		if(calling == "save") {
			if(filter.endTime > filter.startTime) {
				client.send("fay " + ALS(databaseSchedule2.fay.start_time) + " " + ALS(databaseSchedule2.fay.end_time) + " " + databaseSchedule2.fay.start_temp + " " + databaseSchedule2.fay.end_temp);
				client.send("sav2");
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
