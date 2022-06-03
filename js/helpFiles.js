//the functions in this file are used in on the heml.html page. For most menu items on the left pane of bootStrap.html the functions in this file help to explain 
//what the menu item does. Most of the functions are in the form of bullets, for easy readability. Images are added where necessary, which helps the user know the 
//results to expect for each menu item
function conditionAssessment(){
	document.getElementById("pageHolder").innerHTML = "";
	urString = '<h3>Condition Assessment</h3><li>This is not a menu item on the app page</li>'+
				'<li>But is  a very important task that should be done'+
				'<li>After assets have been created on the large screen, you will see them in different colours on the small screen</li>'+
				'<li>When asset points are clicked, a condition popup is shown for the conditions to be given via radio buttons</li>'+
				'<br><img src="css/images/startpagewithpopupon1assetpt.png" width="750px" height ="650px" alt= "condition startpage" align="middle"></img></br>'+
				'<li>You have to select the condition of the asset and click on the "Save Asset Condition" button</li>'+
				'<li>After, you are told whether the current condition you have submitted, is different from or the same as the previous condition of the asset</li>'+
				'<li>Different colour representations of the markers:</li>'+
				'<li style="color:orange;">Orange: Element is in very good condition<br>'+
				'<li style="color:#5FC536;">Orange: Some aesthetic defects, needs minor repair<br>'+
				'<li style="color:#248EF7;">Orange: Functional degradation of some parts, needs maintenance<br>'+
				'<li style="color:grey;">Orange: Not working and maintenance must be done as soon as reasonably possible<br>'+
				'<li style="color:red;">Orange: Not working and needs immediate, urgent maintenance<br>'+
				'<li style="color:black;">Orange: Unknown(Meaning a condition value has not been chosen for the asset)<br>'+
				'<p>'+
				'<p>When you are close to an asset, a popup automatically shows on the screen for you to give a condition for the asset</p>'
				document.getElementById("pageHolder").innerHTML = document.getElementById("pageHolder").innerHTML + urString;

}

function huserRanking(){
	document.getElementById("pageHolder").innerHTML = "";
	urString = '<h4>User Ranking</h4>This menu item, when clicked gives the user '
				+'their current rank based on the number of condition reports they have created, in comparison '+
				'with all other users</h4><br><img src="css/images/ranking_alert.png" alt= "condition startpage" align="middle"></img></br>'
	document.getElementById("pageHolder").innerHTML = document.getElementById("pageHolder").innerHTML + urString;

}

function haddLayer5ClosestAssets(){
	document.getElementById("pageHolder").innerHTML = "";
	Closest5AssetsString = '<h4>5 Closest Assets</h4>This menu item obtains the closest assets to the users position. '+
	'<li>The marker colour shown for this layer is white.</li>'+
	'<li>When any of the white markers are clicked, the asset information is shown</li>'+
	'<li>The image below is an example<br><img src="css/images/5closestassetswithpopupon1cond.png" width="750px" height ="650px" alt="5 closest assets" align="middle"></img></br>'+
	'<li>Clicking on the "Remove Layer-5 closest assets" menu, removes this layer and returns you to the assets that have been created by you.</li>'
	document.getElementById("pageHolder").innerHTML = document.getElementById("pageHolder").innerHTML + Closest5AssetsString;
}

function haddLayerLast5ReportsColourCoded(){
	document.getElementById("pageHolder").innerHTML = "";
	last5ReportsCCString = '<h4>Last 5 Reports Colour Coded</h4>This menu item obtains the last 5 reports that have been submitted by'+
	'the user, with colours'+
	'<li>When an asset marker is clicked, its name and condition description are shown on a popup.</li>'+
	'<li>An example is shown in the image below<br><img src="css/images/last5reportscolourcoded.png" width="750px" height="650px" alt="last 5 reports colourcoded" align="middle"></img></br>'+
	'<li>Clicking on the "Remove Layer-last 5 reports, colour coded" menu, removes this layer and returns you to the assets that have been created by you.</li>'
	document.getElementById("pageHolder").innerHTML = document.getElementById("pageHolder").innerHTML + last5ReportsCCString;
}

function haddLayerNotRatedLast3Days(){
	document.getElementById("pageHolder").innerHTML = "";
notRated3DaysString = '<h4>Not Rated in the Last 3 Days</h4><li>This menu item obtains all assets that have not had conditions assesments in the last three days.</li>'+
					  '<li>They are shown with the beige colour</li><li>Once this layer is shown on the map, the closest asset point is obtained from your location, a condition form pops up on that asset so that you can rate it and submit</li>'+
					  '<li>Alternatively, when an asset point is clicked, there is a condition form popup for you to fill and submit</li></h4><br><img src="css/images/notratedl3days.png" width="750px" height ="650px" </img></br>'+
					  '<li>Clicking on the "Remove Layer-Not rated in the last 3 days" menu, removes this layer and returns you to the assets that have been created by you.</li>'
	document.getElementById("pageHolder").innerHTML = document.getElementById("pageHolder").innerHTML + notRated3DaysString;
}