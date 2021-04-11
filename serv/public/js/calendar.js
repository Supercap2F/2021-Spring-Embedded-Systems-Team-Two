 function loadScript( url, callback ) {
	  var script = document.createElement( "script" )
	  script.type = "text/javascript";
	  if(script.readyState) {  // only required for IE <9
	    script.onreadystatechange = function() {
	      if ( script.readyState === "loaded" || script.readyState === "complete" ) {
	        script.onreadystatechange = null;
	        callback();
	      }
	    };
	  } else {  //Others
	    script.onload = function() {
	      callback();
	    };
	  }

	  script.src = url;
	  document.getElementsByTagName( "head" )[0].appendChild( script );
}

// call the function...
loadScript("./vanilla-calendar-master/src/js/vanilla-calendar-min.js", function() {
	let myCalendar = new VanillaCalendar ({
		selector: "#myCalendar",
		pastDates: false,
		datesFilter: false,

	})




  	//alert('script ready!'); 
});





/*


 // Adding the script tag to the head as suggested before
 var head = document.getElementsByTagName('head')[0];
 var script = document.createElement('script');
 script.type = 'text/javascript';
 script.src = "./vanilla-calendar-master/src/js/vanilla-calendar-min.js";

 // Then bind the event to the callback function.
 // There are several events for cross browser compatibility.
 //script.onreadystatechange = callback;
 //script.onload = callback;

 // Fire the loading
 head.appendChild(script);



let myCalendar = new VanillaCalendar ({
	selector: "#myCalendar",
	pastDates: true,
	datesFilter: false,

})*/