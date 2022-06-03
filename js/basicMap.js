var mymap = L.map('mapContainer').setView([51.505, -0.09], 9);
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you

function loadLeafletMap(){
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {

				maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1

			}).addTo(mymap);
		// now add the click event detector to the map
		}


//setting up an ajax call to the api endpoint to obtain the user_id value
var user_id;
function getUserId(){
  var baseComputerAddress = document.location.origin;
  var dataAddress= "/api/getUserId";
  var URL = baseComputerAddress + dataAddress;
  $.ajax({url: URL, async: false, crossDomain: true,success: function(result){
  	user_id = result.user_id;
   }})
}

