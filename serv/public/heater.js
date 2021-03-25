
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


function weeklyScheduleClick(i) {
	console.log(i);
}