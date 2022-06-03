var userPosition;
function closestFormPoint(layerToCheck) {
	var userlat = userPosition[0];
	var userlong = userPosition[1];
	
	var minDistance = 100000000000;
	var closestFormPoint = 0;

	layerToCheck.eachLayer(function(layer) {
		var distance = getDistance(userlat, userlong, layer.getLatLng().lat, layer.getLatLng().lng, 'K');
		if (distance < minDistance){
			minDistance = distance;
			closestFormPoint = layer.feature.properties.id;
			}
			});

	layerToCheck.eachLayer(function(layer) {
		if (layer.feature.properties.id == closestFormPoint){
			layer.openPopup();
}
});
}



// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function getDistance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	subAngle = Math.acos(subAngle);
	subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
	dist = (subAngle/360) * 2 * Math.PI * 3956; // (subtended angle in degrees)/360) * 2 * pi * radius
												// where radius of the earth is 3956 miles
	if (unit=="K") { dist = dist * 1.609344; } // convert miles to km
	if (unit=="N") { dist = dist * 0.8684; } // convert miles to nautical miles
	return dist;

} 

function ageOfCurrentCondition(condition_report_date){//calculates the age of the consiiton report of an asset
	today = new Date()
	diff_in_days = Math.floor((today.getTime()-Date.parse(condition_report_date))/(24*3600*1000))
	//formula adapted from https://stackoverflow.com/questions/7763327/how-to-calculate-date-difference-in-javascript
	return diff_in_days;
}