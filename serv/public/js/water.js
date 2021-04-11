var waterLevelElement;

var setLevel;

window.addEventListener('load', function () {
	waterLevelElement = document.getElementById("water-set");
	waterLevelElement.addEventListener('input', updateWaterLevel);
	updateWaterLevel();
});


function updateWaterLevel() {
	// update the value displayed
	//	9 is the maximum level
	setLevel = waterLevelElement.value; 
	document.getElementById("water-set-level").innerHTML = "Set Level = " + setLevel + "\"";
}


function saveWaterSettings() {
	// send new water level set value to websockets
	console.log("water level saved");

	client.send("wl: " + setLevel);
}

function updateServerWaterLevel() {

	var waterPixels = Math.floor((serverWaterLevel/9) * 170);
	document.getElementById("water-level-bar").style.height = waterPixels +"px";
	document.getElementById("water-level-bar").style.top = 170 - waterPixels+"px";

	console.log(waterPixels);
	document.getElementById("water-actual-level").innerHTML = "Actual Level = " + serverWaterLevel + "\"";




}



