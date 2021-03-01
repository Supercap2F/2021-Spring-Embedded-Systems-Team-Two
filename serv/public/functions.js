
function changeMenu(callingElement) {
	var mainmenu = document.getElementById("mainmenu");
	var heatingmenu = document.getElementById("heatingmenu");
	var filtermenu = document.getElementById("filtermenu");
	var lightmenu = document.getElementById("lightmenu");
	var moremenu = document.getElementById("moremenu");

	if(callingElement.id == "heatingmenu-element") {
		mainmenu.style.display = "none";
		heatingmenu.style.display = "block"
		
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
	}


}