var user_id;
function getUserId(){
  //this function obtains the user id from the getUserId endpoint;
  var baseComputerAddress = document.location.origin;
  var dataAddress= "/api/getUserId";
  var URL = baseComputerAddress + dataAddress;
  $.ajax({url: URL, async: false, crossDomain: true,success: function(result){
    user_id = result.user_id;
}})
}



function userRanking(){
    var userRanking;
    //this is the function for getting the users ranking based on number of condition reports they 
    //have created. This will be connected to the userRanking menu on the condition app side
    var baseComputerAddress = document.location.origin;
    var userRankingDataAddress="/api/userRanking/"+user_id+"";
    var userRankingURL = baseComputerAddress + userRankingDataAddress;

    $.ajax({url: userRankingURL, async: false, crossDomain: true,success: function(result){
        userRanking = result.rank;}});
        alert("For condition reports submitted, your rank is "+userRanking+" out of all other users");
    }