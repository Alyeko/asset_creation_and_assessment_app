var user_id;
function getUserId(){
  var baseComputerAddress = document.location.origin;
  var dataAddress= "/api/getUserId";
  var URL = baseComputerAddress + dataAddress;
  $.ajax({url: URL, async: false, crossDomain: true,success: function(result){
    user_id = result.user_id;
    }})
}

var asset_name_clicked_on_bar;
var entity_clicked;
var entities;
function loadVectorLayer(){
             getUserId()
            // get the data - NB this assumes that the API is running
            var layerURL = document.location.origin + "/api/geoJSONUserId/"+user_id+"";
            var geoJSONOptions = {
              stroke: Cesium.Color.RED,
                  fill: Cesium.Color.RED ,
                  strokeWidth: 3, }

            var dataSource = new Cesium.GeoJsonDataSource("points");
                  dataSource.clampToGround=false;
                  dataSource._name = "points";
                  viewer.dataSources.add(dataSource);
                  dataSource.load(layerURL,geoJSONOptions).then(function(dataSource){
                      viewer.flyTo(dataSource);
                    
            entities = dataSource.entities.values; //changing the markers from default billboard to points
            for (var i = 0; i < entities.length; i++) { //code adpated from https://gis.stackexchange.com/questions/190270/viewing-a-point-geojson-layer-as-markers-in-cesium
                var entity = entities[i];
                if (entity._properties._condition_description._value=='Element is in very good condition'){
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.DARKORANGE,
                    pixelSize: 15
                })}
              
                else if (entity._properties._condition_description._value=='Some aesthetic defects, needs minor repair'){  
                entity.billboard = undefined;                               
                entity.point = new Cesium.PointGraphics({                       //different cesium color choices obtained from
                    color: Cesium.Color.YELLOWGREEN,                        //https://cesium.com/learn/cesiumjs/ref-doc/Color.html
                    pixelSize: 15
                })}

                else if (entity._properties._condition_description._value=='Functional degradation of some parts, needs maintenance'){
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.DODGERBLUE,
                    pixelSize: 15
                })}

                else if (entity._properties._condition_description._value=='Not working and maintenance must be done as soon as reasonably possible'){
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.GREY,
                    pixelSize: 15
                })}

                else if (entity._properties._condition_description._value=='Not working and needs immediate, urgent maintenance'){
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.RED,
                    pixelSize: 15
                })}

                else {
                entity.billboard = undefined;
                entity.point = new Cesium.PointGraphics({
                    color: Cesium.Color.BLACK,
                    pixelSize: 15
                })}

            }
            })          
            viewer.selectedEntityChanged.addEventListener(function(selectedEntity) {
              if (Cesium.defined(selectedEntity)) {
                  if (Cesium.defined(selectedEntity.name)) { //code adapted from https://sandcastle.cesium.com/#c=rVPBTuMwEP2VUS5NtcUpKqhQQrWi9BaJlSpASLmYeFIsnHFlO+mWVf8dJ22g7RYJrfYSecbvvXkz41TcQCVxiQaugXAJE7SyLNhDkwvTIGviiSbHJaFJg+5VSiltOAzJSSfRMi5E+CclAOIFjiANnlApvYRfWpJLg159tdDWgzWN2iITbpw/cRqw3OjiFucG0YYnw3N2fjkcDntw1mf9wcXFoLsV8GIjaOr4SP5GNZNvvtxpv7fJZVpp86lfR+xpmiR3jw1g7b/rbzZwo0r8R/uX/9P+TXI//cK8RYWZQzGtm1hNXjjNUdSdTCvfVyKtQ7+yMC8pq42H+/juxonMIdwWFJj7HYtDXLe1/A0wq8e3y6ibIqsVMqXnYWe2RUMHfsAx6lVLXAMqi18K3dMr6SVBs8DVhxTr7Cg0U9uT2ZO4xUPWejvhoBfE1q0Ujlutn7JYaOOgNCpkLHJYLBT324+ey+wVHcusbQvH0S41FrICKa6P/EmQKW6tv8lL1byENBjHkcf/RVWaC0nzuwqN4qsa9nI6TjZJxlgc+fA402mtnrk5UH4H
                    entity_clicked = selectedEntity.name
                }
                    
                  }
              
            })}


function zoomToCesiumPointBasedOnBarClicked(asset_name_clicked_on_bar, entities2){
    //looping through all entities which have been loaded and checking if the an entity is the same as the asset name that has been clicked on the bar graph
    for (var i = 0; i < entities2.length; i++) {
                var entity2 = entities2[i]
                if (entity2._properties._asset_name._value==asset_name_clicked_on_bar){
                              
               viewer.flyTo(entity2)
                                
               }
}}

