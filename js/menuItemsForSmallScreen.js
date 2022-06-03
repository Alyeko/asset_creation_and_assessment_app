var trackLocationLayer;
var testMarkerWhite = L.AwesomeMarkers.icon({ //for 5closestsAssets Layer
		icon: 'play',
		markerColor: 'white'
		});

var testMarkerOrange = L.AwesomeMarkers.icon({  //Element is in very good condition
		icon: 'play',
		markerColor: 'orange'
		});

var testMarkerGreen = L.AwesomeMarkers.icon({ // Some aesthetic defects, needs minor repair
		icon: 'play',
		markerColor: 'green'
		});

var testMarkerBlue = L.AwesomeMarkers.icon({ // 'Functional degradation of some parts, needs maintenance'
		icon: 'play',
		markerColor: 'blue'
			});

var testMarkerGray = L.AwesomeMarkers.icon({ //'Not working and maintenance must be done as soon as reasonably possible'
		icon: 'play',
		markerColor: 'gray'
		});
var testMarkerRed = L.AwesomeMarkers.icon({ //'Not working and needs immediate, urgent maintenance'
		icon: 'play',
		markerColor: 'red'
		});

var testMarkerBlack = L.AwesomeMarkers.icon({ //'Unknown'/NO condition captured
		icon: 'play',
		markerColor: 'black'
		});

var testMarkerBeige = L.AwesomeMarkers.icon({ //'For conditionReportsMissing endpoint
		icon: 'play',
		markerColor: 'beige'
		});


var LSState;
var Last5ReportsCCLayer;
var Last5ReportsLayerState = 0;
var AssetsLayerSS;
var AssetsLayerLS;
function addLayerLast5ReportsColourCoded() {
	//this function obtains the data from the endpoint /lastFiveConditionReports, and loads it on the map as markers with different colours, depending on the current condition 
	if (mymap.hasLayer(AssetsLayerLS)){
		mymap.removeLayer(AssetsLayerLS);
		LSState=0}

	if (Last5ReportsLayerState===0) {
		var baseComputerAddress = document.location.origin;
		var assetsDataAddress="/api/lastFiveConditionReports/"+user_id+"";
		var Last5ReportsLayerURL = baseComputerAddress + assetsDataAddress;	
		
		$.ajax({url: Last5ReportsLayerURL, crossDomain: true,success: function(result){
		Last5ReportsCCLayer = L.geoJson(result, {
		pointToLayer: function (feature, latlng){
			asset_name = feature.properties.asset_name;
			condition_description = feature.properties.condition_description;
			if (feature.properties.condition_description == 'Element is in very good condition') {return L.marker(latlng, {icon:testMarkerOrange}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}
			else if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair') {return L.marker(latlng, {icon:testMarkerGreen}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}
			else if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance') {return L.marker(latlng, {icon:testMarkerBlue}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}
			else if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible') {return L.marker(latlng, {icon:testMarkerGray}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}
			else if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance') {return L.marker(latlng, {icon:testMarkerRed}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}
			else {return L.marker(latlng, {icon:testMarkerBlack}).bindPopup("Asset Name: "+asset_name+"<br>Condition Description: "+condition_description+"")}	
									}, // end of point to layer
		}).addTo(mymap);
		mymap.fitBounds(Last5ReportsCCLayer.getBounds())
	    Last5ReportsLayerState = 1;} 
	 	
	})
		if (mymap.hasLayer(AssetsLayerSS)){
			mymap.removeLayer(AssetsLayerSS)
			SSState=0;}
 	}    
		
	else {alert("Layer has already been added and cannot be added twice!")}}


function removeLayerLast5Reports(){
	//this function removes the layer, Last5ReportsCCLayer, from the map
	if (mymap.hasLayer(Last5ReportsCCLayer)){
		mymap.removeLayer(Last5ReportsCCLayer);
		Last5ReportsLayerState=0;
		mymap.addLayer(AssetsLayerSS)
		mymap.fitBounds(AssetsLayerSS.getBounds())
		SSState=1;
	}
	
	else {
		alert("Layer 'last 5 reports, colour coded', doesn't exist, and hence cannot be removed!")
	}
}


		
var notRatedLast3Days;
var last3DaysLayerState=0; //layer has not been added yet
function addLayerNotRatedLast3Days() {
	//this function obtains the data from the endpoint /conditionReportMissing, and loads it on the map as beige markers 
	if (last3DaysLayerState ===0){
		var baseComputerAddress = document.location.origin;                        
		var assetsDataAddress="/api/conditionReportMissing/"+user_id+"";			
		var assetsLayerURL = baseComputerAddress + assetsDataAddress;												   
		$.ajax({url: assetsLayerURL, crossDomain: true,success: function(result){
		notRatedLast3Days = L.geoJson(result, {
			// use point to layer to create the points
			pointToLayer: function (feature, latlng){
			return L.marker(latlng, {icon:testMarkerBeige}).bindPopup(getPopupHTML(feature, user_id));
										}, // end of point to layer
			}).addTo(mymap);
		    mymap.fitBounds(notRatedLast3Days.getBounds()); // change the map zoom so that all the data is shown   
			closestFormPoint(notRatedLast3Days)} 
		})
		last3DaysLayerState=1;//layer has been loaded
		}
	else 
		{alert("The layer has already been loaded and will not be loaded twice!")}}

function removeLayerNotRatedLast3Days(){
	//this function removes the layer, removeLayerNotRatedLast3Days, from the map
	if (mymap.hasLayer(notRatedLast3Days)){//change this layer
		mymap.removeLayer(notRatedLast3Days);
		last3DaysLayerState=0
		mymap.fitBounds(AssetsLayerSS.getBounds())}
	
	else {
		alert("Layer 'not rated in the last 3 days', doesn't exist, and hence cannot be removed!")
	}
}


var trackLocationLayer;
var FiveClosestAssetsLayer;
var fiveClosestAssetsLayerState=0;
var lat;
var long;
function addLayer5ClosestAssets(){
	//this function obtains the data from the endpoint /fiveClosestAssets, and loads it on the map as white markers. It does this by getting the current condition of the user from 
	//the getCurrentLocation function and passes the latitude and longitude values into the fiveClosestAssets endpoint to obtain the data, which finally put on the map
	getCurrentLocation()
	if (fiveClosestAssetsLayerState === 0){
		var baseComputerAddress = document.location.origin;
		var assetsDataAddress="/api/fiveClosestAssets/"+lat+"/"+long+"";
		var FiveClosestLayerURL = baseComputerAddress + assetsDataAddress;	
		
		$.ajax({url: FiveClosestLayerURL, crossDomain: true,success: function(result){
		FiveClosestAssetsLayer = L.geoJson(result, {
		pointToLayer: function (feature, latlng){
			asset_name = feature.properties.asset_name
			installation_date = feature.properties.installation_date
			return L.marker(latlng, {icon: testMarkerWhite}).bindPopup('Asset name: '+feature.properties.asset_name+'<br>'+'Installation Date: '+feature.properties.installation_date+'')}//('+feature.properties.installation_date+')}
			}).addTo(mymap)
		    mymap.fitBounds(FiveClosestAssetsLayer.getBounds())
		    fiveClosestAssetsLayerState = 1;}})

			if (mymap.hasLayer(AssetsLayerSS)){
				mymap.removeLayer(AssetsLayerSS)
				SSState=0;}
		}

	else {alert("Layer already added and cannot be added twice!")}} // change the map zoom so that all the data is shown


function removeLayer5ClosestAssets(){
	//this function removes the layer, FiveClosestAssetsLayer, from the map
	if (mymap.hasLayer(FiveClosestAssetsLayer)){ //change this layer
		mymap.removeLayer(FiveClosestAssetsLayer);
		fiveClosestAssetsLayerState= 0
		mymap.addLayer(AssetsLayerSS)
		mymap.fitBounds(AssetsLayerSS.getBounds())
		SSState=1;
	}
	
	else {
		alert("Layer '5 closest assets', doesn't exist, and hence cannot be removed!")
	}
}
