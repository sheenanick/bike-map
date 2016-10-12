var Map = require('./../js/map.js').mapModule;

var mapObject;
var displayMap = function(lattitude, longitude) {
  var mapLatLng = new google.maps.LatLng(lattitude, longitude);
  var myOptions = {
    zoom : 12,
    center : mapLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
}

var heatmapData = [];
var displayHeatMap = function(lattitude, longitude) {
  var latLng = new google.maps.LatLng(lattitude, longitude);
  heatmapData.push(latLng);
}

function displayMarkers(lattitude, longitude) {
  // here we take the `position` object returned by the geolocation api
  // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
  // it 2 arguments: one for latitude, one for longitude.
  // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
  // But you must use coordinates to use this method.
  var userLatLng = new google.maps.LatLng(lattitude, longitude);


  // Place the marker
  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
}

// function geolocationError(positionError) {
//   alert(positionError);
// }
