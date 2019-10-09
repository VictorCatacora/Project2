function MapSite(){
//Create a variable to save CMDATA in json format
var CMData = "dataset/cm/csvjson.json";
console.log("Tess");
// Perform a GET request to data
var UARFCN4413 = [];
var UARFCN4437 = [];
var UARFCN9715 = [];
var UARFCN9736 = [];
var UARFCN9862 = [];
function createMarkers(response) {
    //Define radio and function radio
    var radio4413=0.001;
    var radio4437=0.0014;
    var radio9715=0.0018;
    var radio9736=0.0022;
    var radio9862=0.0024;
    //console.log(radio4413);
    
  for (var i = 0; i < response.length; i++) {
    var UARFCN=response[i].UARFCN;
    var lat = response[i].Latitude;
    var lng = response[i].Longitude;
    var az = response[i].Azimuth;
    
    if (UARFCN == 9862){    
    var lat1= lat+radio9862*(Math.cos(Math.PI*(az+30)/180));
    var lng1= lng+radio9862*(Math.sin(Math.PI*(az+30)/180));
    var lat2= lat+radio9862*(Math.cos(Math.PI*(az-30)/180));
    var lng2= lng+radio9862*(Math.sin(Math.PI*(az-30)/180));
    UARFCN9862.push(
    L.polygon([
    [lat, lng],
    [lat1, lng1 ],
    [lat2,lng2] 
    ], {
    color: "gray",
    fillColor: "yellowgreen",
    fillOpacity: 0.4}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
    //.addTo(myMap)
    );
    //console.log(UARFCN9862)
    }
    
    else if (UARFCN == 9736){
    var lat1= lat+radio9736*(Math.cos(Math.PI*(az+30)/180));
    var lng1= lng+radio9736*(Math.sin(Math.PI*(az+30)/180));
    var lat2= lat+radio9736*(Math.cos(Math.PI*(az-30)/180));
    var lng2= lng+radio9736*(Math.sin(Math.PI*(az-30)/180));
    UARFCN9736.push(
    L.polygon([
    [lat, lng],
    [lat1, lng1 ],
    [lat2,lng2] 
    ], {
    color: "gray",
    fillColor: "yellowgreen",
    fillOpacity: 0.5}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
    //.addTo(myMap)
    //.bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].CELL + "</p>")
    );
    }

    else if (UARFCN == 9715){
    var lat1= lat+radio9715*(Math.cos(Math.PI*(az+30)/180));
    var lng1= lng+radio9715*(Math.sin(Math.PI*(az+30)/180));
    var lat2= lat+radio9715*(Math.cos(Math.PI*(az-30)/180));
    var lng2= lng+radio9715*(Math.sin(Math.PI*(az-30)/180));
    UARFCN9715.push(
    L.polygon([
    [lat, lng],
    [lat1, lng1 ],
    [lat2,lng2] 
    ], {
    color: "gray",
    fillColor: "yellowgreen",
    fillOpacity: 0.6}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
    //.addTo(myMap)
    );
    }
    else if (UARFCN ==4437){
    var lat1= lat+radio4437*(Math.cos(Math.PI*(az+30)/180));
    var lng1= lng+radio4437*(Math.sin(Math.PI*(az+30)/180));
    var lat2= lat+radio4437*(Math.cos(Math.PI*(az-30)/180));
    var lng2= lng+radio4437*(Math.sin(Math.PI*(az-30)/180));
    UARFCN4437.push(
    L.polygon([
    [lat, lng],
    [lat1, lng1 ],
    [lat2,lng2] 
    ], {
    color: "gray",
    fillColor: "blue",
    fillOpacity: 0.7}).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
    //.addTo(myMap)
    );
    }
    else  {
    var lat1= lat+radio4413*(Math.cos(Math.PI*(az+30)/180));
    var lng1= lng+radio4413*(Math.sin(Math.PI*(az+30)/180));
    var lat2= lat+radio4413*(Math.cos(Math.PI*(az-30)/180));
    var lng2= lng+radio4413*(Math.sin(Math.PI*(az-30)/180));
    UARFCN4413.push(
    L.polygon([
    [lat, lng],
    [lat1, lng1 ],
    [lat2,lng2] 
    ]).bindPopup("<p>" + response[i].SITE_NAME+ "</p><p>" + response[i].Site + "</p><p>" + response[i].CELL + "</p>")
    //.addTo(myMap)
    );
    //console.log(lat);
    //console.log(test);
    }
};


// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 20,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

// Create separate layer groups: one 
var u4413 = L.layerGroup(UARFCN4413);
var u4437 = L.layerGroup(UARFCN4437);
var u9715 = L.layerGroup(UARFCN9715);
var u9736 = L.layerGroup(UARFCN9736);
var u9862= L.layerGroup(UARFCN9862);


//console.log(u4413)

// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Satellite Map": satellitemap
};

// Create an overlay object
var overlayMaps = {
  "UARFNC9862": u9862,
  "UARFNC9736": u9736,
  "UARFNC9715": u9715,
  "UARFNC4437": u4437,
  "UARFNC4413": u4413  
};
//console.log(u4413);

// Define a map object
var myMap = L.map("map", {
  center: [20.73074, -103.450012],
  zoom: 16,
  layers: [streetmap, u9736]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true
}).addTo(myMap);





}

d3.json(CMData, createMarkers);

}
MapSite();

// Create a new marker
// Set the longitude, latitude, and the starting zoom level

//var searchLayer = L.layerGroup().addTo(myMap);
//... adding data in searchLayer ...
//map.addControl( new L.Control.Search({layer: searchLayer}) );
//searchLayer is a L.LayerGroup contains searched markers