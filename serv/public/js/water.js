var waterLevelElement;

var setLevel = 2;

window.addEventListener('load', function () {
	waterLevelElement = document.getElementById("water-set");
	waterLevelElement.addEventListener('input', updateWaterLevel);
	updateWaterLevel();

	client.send("sl " + setLevel);
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
	setLevel = Math.round((setLevel/9)*255);
	client.send("sl " + setLevel);
}

function updateServerWaterLevel() {
	var waterPixels = Math.floor((serverWaterLevel/9) * 170);
	document.getElementById("water-level-bar").style.height = waterPixels +"px";
	document.getElementById("water-level-bar").style.top = 170 - waterPixels+"px";

	//console.log(waterPixels);
	document.getElementById("water-actual-level").innerHTML = "Actual Level = " + serverWaterLevel.toFixed(1) + "\"";

}



