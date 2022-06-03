var device_width; 
var popup=L.popup(); 
var mapPoint; 
var AssetsLayerLS;
function loadLSAssetsData() {//this function loads user asset markers for a large screen
	var baseComputerAddress = document.location.origin;
	var assetsDataAddress="/api/geoJSONUserId/"+user_id+"";
	var assetsLayerURL = baseComputerAddress + assetsDataAddress;	

	$.ajax({url: assetsLayerURL, crossDomain: true,success: function(result){
		if (result['features']==null){alert("Uh-oh, you have not created any assets. Click on map to create some!")}
		
		else {
		AssetsLayerLS = L.geoJson(result, {
		// use point to layer to create the points
		pointToLayer: function (feature, latlng){
		return L.marker(latlng);
									}, // end of point to layer
		}).addTo(mymap);
	    mymap.fitBounds(AssetsLayerLS.getBounds()) // change the map zoom so that all the data is shown   

	    AssetsLayerLS.eachLayer(function(layer){
	    	asset_id = layer.feature.properties.asset_id;
	    	asset_name = layer.feature.properties.asset_name;
	    	condition_description = layer.feature.properties.condition_description;
	    	layer.dragging._marker.bindPopup(getCurrentConditionPopup(asset_id, asset_name, condition_description));
	    })}}})}
	
var AssetsLayerSS;
function setUpPointClick() {//this function loads user asset markers for a small screen
	var baseComputerAddress = document.location.origin;
	var assetsDataAddress="/api/geoJSONUserId/"+user_id+"";
	var assetsLayerURL = baseComputerAddress + assetsDataAddress;	

	$.ajax({url: assetsLayerURL, crossDomain: true,success: function(result){
		if (result['features']==null){alert("Uh-oh, you have not created any assets. Switch to large screen and click on map to create some!")}

		else {AssetsLayerSS = L.geoJson(result, {
		pointToLayer: function (feature, latlng){
			if (feature.properties.condition_description == 'Element is in very good condition') 
				{return L.marker(latlng, {icon:testMarkerOrange}).bindPopup(getPopupHTML(feature))}
			else if (feature.properties.condition_description == 'Some aesthetic defects, needs minor repair') 
				{return L.marker(latlng, {icon:testMarkerGreen}).bindPopup(getPopupHTML(feature))}
			else if (feature.properties.condition_description == 'Functional degradation of some parts, needs maintenance') 
				{return L.marker(latlng, {icon:testMarkerBlue}).bindPopup(getPopupHTML(feature))}
			else if (feature.properties.condition_description == 'Not working and maintenance must be done as soon as reasonably possible') 
				{return L.marker(latlng, {icon:testMarkerGray}).bindPopup(getPopupHTML(feature))}
			else if (feature.properties.condition_description == 'Not working and needs immediate, urgent maintenance')
			 {return L.marker(latlng, {icon:testMarkerRed}).bindPopup(getPopupHTML(feature))}
			else {return L.marker(latlng, {icon:testMarkerBlack}).bindPopup(getPopupHTML(feature))}
									}, // end of point to layer
		}).addTo(mymap);
	    mymap.fitBounds(AssetsLayerSS.getBounds()); // change the map zoom so that all the data is shown
		closestFormPoint(AssetsLayerSS)
	}}})}

var LSState =0;  //LSState represents Large Screen(LS) asset points. A value of 0 means LS asset points not loaded
var SSState =0;  //SSState represents Small State(SS) asset points.  A value of 0 means SS asset points not loaded
function setMapClickEvent() {
	device_width = $(window).width();
	
	if (device_width>=992){ // for a large, screen, there should be an asset form show on map after a click on the map
		if (LSState===0){
			loadLSAssetsData()
			LSState=1
			mymap.on('click', onMapClick)} // the on click functionality pops up a blank asset creation form
		else if (LSState===1){
			if (mymap.hasLayer(AssetsLayerSS)){
				mymap.removeLayer(AssetsLayerSS)
				SSState=0;}
			if (mymap.hasLayer(FiveClosestAssetsLayer)){
				mymap.removeLayer(FiveClosestAssetsLayer);
				fiveClosestAssetsLayerState=0;}

			if (mymap.hasLayer(Last5ReportsCCLayer)){
				mymap.removeLayer(Last5ReportsCCLayer);
				Last5ReportsLayerState=0;}

			if (mymap.hasLayer(notRatedLast3Days)){
				mymap.removeLayer(notRatedLast3Days);
				last3DaysLayerState=0;}
			}}
	
	else if (device_width<992) { 				                   
		if (SSState===0){
		setUpPointClick()  // set up a point with click functionality for asset points on small screen
		mymap.off('click', onMapClick);
		trackLocation()
		SSState=1}

		else if (SSState===1){
			if (mymap.hasLayer(AssetsLayerLS)){
				mymap.removeLayer(AssetsLayerLS)
				LSState=0;}}

		}
		}
	
var trackLocationLayer = []; //store the ID of the location tracker so that it can be used to switch the location tracking off
var geoLocationID;

function trackLocation() {
    if (navigator.geolocation) {
    	navigator.geolocation.watchPosition(showPosition);  }
   else {
   		alert("Geolocation is not supported by this browser");}
   }
var userPosition = [];
function showPosition(position) {
  trackLocationLayer.push(L.marker([position.coords.latitude, position.coords.longitude]))
  userPosition = [position.coords.latitude, position.coords.longitude];
}

var lat;
var long;
function getCurrentLocation(){
	lat = trackLocationLayer.slice(-1)[0]._latlng.lat;
	long = trackLocationLayer.slice(-1)[0]._latlng.lng;
}

var asset_name;
var a_id;
var installation_date;
var previousConditionValue;
function getPopupHTML(feature, user_id) {//this is the function which shows the popup for condition assessment of an asset
	a_id= feature.properties.asset_id;
	asset_name= feature.properties.asset_name;
	installation_date= feature.properties.installation_date;
	previousConditionValue = feature.properties.condition_description;

	    var htmlString = 

        '<p><b>Asset Condition Form</b></p>' +
        '<div id=previousConditionValue_' +a_id + ' hidden>'+previousConditionValue+'</div>' +  
        '<div id=asset_' + a_id + ' hidden >'+ a_id +'</div>' +
        '<div id="user_id" style="display: none;">'+ user_id + '</div>' + 
        '<div class="label"><label class="label" id="assetId'+a_id+'">Asset Id: </label>'+ ' ' +a_id+'</div>'+
        'Asset Name: ' + '<div id = "asset_name' + a_id + '"' + '>' + asset_name + '</div><br>' +
        '<div class="label"><label class="label" id="installation_date'+a_id+'">Installation Date: </label>'+ ' ' +installation_date+'</div>'+
        '<b>Select the condition of asset</b><br>' +
        '<input type="radio" name="condition" value = "Element is in very good condition" id="condition' + a_id + '_1" />Element is in very good condition<br />' +
        '<input type="radio" name="condition" value = "Some aesthetic defects, needs minor repair" id="condition' + a_id + '_2" />Some aesthetic defects, needs minor repair<br />' +
        '<input type="radio" name="condition" value = "Functional degradation of some parts, needs maintenance" id="condition' + a_id + '_3" />Functional degradation of some parts, needs maintenance<br />' +
        '<input type="radio" name="condition" value = "Not working and maintenance must be done as soon as reasonably possible" id="condition' + a_id + '_4" />Not working and maintenance must be done as soon as reasonably possible <br />' +
        '<input type="radio" name="condition" value = "Not working and needs immediate, urgent maintenance" id="condition' + a_id + '_5" />Not working and needs immediate, urgent maintenance<br />' +
        '<button id="saveConditionInformation" onclick="checkCondition(' + a_id + ')">Save Asset Condition</button>'
     return htmlString;
} 		

function getCurrentConditionPopup(asset_id, asset_name, condition_description){ //this function adds an html popup showing the asset_name and current condition_description of an asset
	var htmlString_ccp;
	if (condition_description == 'Unknown') {
		condition_description = 'No condition captured'
		htmlString_ccp = 
		'<div class="label"><label class="label" id="asset_name'+asset_id+'">Asset Name: </label>'+ asset_name+'</div><br>'+
		'<div class="label"><label class="label" id="current_condition_description'+asset_id+'">Current Condition: </label>'+ condition_description+'</div>'
		}
		
	else {
		htmlString_ccp = 
		'<div class="label"><label class="label" id="asset_name'+asset_id+'">Asset Name: </label>'+ asset_name+'</div><br>' +
		'<div class="label"><label class="label" id="current_condition_description'+asset_id+'">Current Condition: </label>'+ condition_description+'</div>'
		}
	return htmlString_ccp;}

var numConditionReportsSubmitted;
function numberOfConditionReportsSubmitted(){ //this function returns the number of condition reports a user has submitted
	var baseComputerAddress = document.location.origin;
	var dataAddress= "/api/userConditionReports/"+user_id+"";
	var URL = baseComputerAddress + dataAddress;
	$.ajax({url: URL, async: false, crossDomain: true,success: function(result){
	numConditionReportsSubmitted = result['num_reports'];
	alert('You have now created '+ (parseInt(numConditionReportsSubmitted)+1)+' condition reports');
}})}


//adapted from https://stackoverflow.com/questions/18712899/check-whether-the-date-entered-by-the-user-is-current-date-or-the-future-date
function isFutureDate(idate){
var today = new Date().getTime(),
    idate = idate.split("-");

idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
return (today - idate) < 0 ? true : false;
}

var userAssetNames = [];
var usernameExists = 0;
getUserId()
function assetNameAlreadyExists(users_asset_name_value){ //this function checks whether an asset_name entered by the user already exists. An alert message is shown if this is the case
	var baseComputerAddress = document.location.origin;
	var assetsDataAddress="/api/geoJSONUserId/"+user_id+"";
	var assetsLayerURL = baseComputerAddress + assetsDataAddress;	

	$.ajax({url: assetsLayerURL, crossDomain: true,success: function(result){
		 for (var j = 0; j < result.features.length; j++) { //for loop to obtain all the asset_names from the endpoint and store in an array
		 	users_asset_name_value === result.features[j].properties['asset_name']
		 	userAssetNames.push(result.features[j].properties['asset_name'])
		 	}
		 
		 for (var i = 0; i<userAssetNames.length; i++){
		 	if (users_asset_name_value === userAssetNames[i]){
		 		alert('Unfortunately, the asset name, '+userAssetNames[i]+', already exists. You must chose another one!')	
		 		}
		 	}
		 }})
	}

var js_condition_description;
var noRadioButtonChecked;
function checkCondition(a_id){
		var asset_name = document.getElementById("asset_name"+a_id).innerHTML;
	
		var condition1 = document.getElementById("condition" + a_id + "_1");
		var condition2 = document.getElementById("condition" + a_id + "_2");
		var condition3 = document.getElementById("condition" + a_id + "_3");
		var condition4 = document.getElementById("condition" + a_id + "_4");
		var condition5 = document.getElementById("condition" + a_id + "_5");

		if (condition1.checked){
			js_condition_description = condition1.value;
			noRadioButtonChecked = 0;
			}

		else if (condition2.checked){
			js_condition_description = condition2.value;
			noRadioButtonChecked = 0;
		}

		else if (condition3.checked){
			js_condition_description = condition3.value;
			noRadioButtonChecked = 0;
		}

		else if (condition4.checked){
			js_condition_description = condition4.value;
			noRadioButtonChecked = 0;
		}

		else if (condition5.checked){
			js_condition_description = condition5.value;
			noRadioButtonChecked = 0; //radiobutton has been checked...
		}

		else {
			noRadioButtonChecked = 1; //no radio button has been checked
		}
		


	var previousConditionValue = document.getElementById("previousConditionValue_" + a_id).innerHTML; //getting the previous condition value from the hidden field
	if (noRadioButtonChecked===1){
		alert("No value chosen. Please provide a condition for the asset!");
		noRadioButtonChecked=0;
	}

	else if (previousConditionValue == js_condition_description){
		alert('For '+asset_name+', previous condition and selected condition are the same!');
		var postString = "asset_id=" +a_id + "&condition_description="+ js_condition_description + "&asset_name="+ asset_name;
		processConditionData(postString);}
		

	else if (previousConditionValue != js_condition_description){
		 alert('For '+asset_name+', previous condition and selected condition are not the same!');
		 var postString = "asset_id=" +a_id + "&condition_description="+ js_condition_description + "&asset_name="+ asset_name;
		 processConditionData(postString);
		}
	
	}
	


function onMapClick(e) {
	var formHTML = basicFormHtml(e.latlng);
	popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()+"<br>"+formHTML).openOn(mymap);
	}

function basicFormHtml(latlng, user_id){
	var myvar = '<p><b>Create a New Asset</b></p>'+
		'<div id="user_id" style="display: none;">'+ user_id + '</div>' + 
		'<label for="asset_name">Asset name</label><input type="text" size="25" id="asset_name"/><br/>'+
		'<label for="Installation_date">Installation date</label><input type="date" id="installation_date"/><br/>'+
		'<div id="latitude" style="display: none;">'+ latlng.lat + '</div>' +
		'<div id="longitude" style="display: none;">'+ latlng.lng + '</div>' +
		'<button id="saveAsset" name = "saveAsset" onclick="saveNewAsset()">Save Asset</button><br/>'
		
	return myvar;}


function saveNewAsset() {
	var asset_name = document.getElementById("asset_name").value;
	var installation_date = document.getElementById("installation_date").value;
	var latitude = document.getElementById("latitude").innerHTML;
	var longitude = document.getElementById("longitude").innerHTML;

	 assetNameAlreadyExists(asset_name);
	
	 if (asset_name.length===0 && installation_date.length===0) {
		alert("Both asset name and installation date are absent. Please provide them")}

	 else if ((asset_name.length===0)) {
	 	alert("No asset name entered. Please provide it")}

	 else if (installation_date.length===0){
	 	alert("No installation date chosen. Please provide it")}

	 else if (isFutureDate(installation_date)==true){
	 	alert('A date in the future has been chosen, which is not feasible. Please select another installation date!')
	 }
	 
	 else {
		var postString = "asset_name="+asset_name +"&installation_date="+installation_date+"&latitude="+latitude+"&longitude="+longitude;
		processAssetCreationData(postString);
		mymap.closePopup(); //popup for asset creation is closed after data is submitted and processed without any issues.
		window.location.reload();
		}
	}
	    		


function deleteSingleAsset() {
	var deleteID = document.getElementById("delete_assetID").value;
	var deleteString = "id="+deleteID;
	var serviceUrl= document.location.origin + "/api/insertAssetPoint";
	$.ajax({
	    url: serviceUrl,
	    crossDomain: true,
	    type: "POST",
	    data: deleteString
});	
}


function dataDeleted(data){
    document.getElementById("deleteAssetResponse").innerHTML = JSON.stringify(data);
}

function processAssetCreationData(postString) { //uploads the data of new asset points being created to the database
	//alert(postString);

	var serviceUrl=  document.location.origin + "/api/insertAssetPoint";
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    data: postString,
    success: alert("New Asset Form created for "+postString.split('&installation_date')[0].split('=')[1]+'!')
	}); 
}

function processConditionData(postString){
	var serviceUrl= document.location.origin + "/api/insertConditionInformation"; 
	$.ajax({
		url: serviceUrl,
		crossDomain: true,
		type: "POST",
		data: postString,  
		});
	mymap.closePopup();
	numberOfConditionReportsSubmitted()
	document.location.reload(true) 
	}

function conditionSaved(data){
	alert(JSON.stringify(data));
}
