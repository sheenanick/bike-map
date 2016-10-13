var Map = require('./../js/map.js').mapModule;

var mapObject;
var displayMap = function(lattitude, longitude) {
  var mapLatLng = new google.maps.LatLng(lattitude, longitude);
  var myOptions = {
    zoom : 12,
    center : mapLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  var bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(mapObject);
  getPlaces(lattitude, longitude);
};

var heatmapData = [];
var displayHeatMap = function(lattitude, longitude) {
  var latLng = new google.maps.LatLng(lattitude, longitude);
  heatmapData.push(latLng);
};

function displayMarkers(lattitude, longitude, bikeData) {
  // here we take the `position` object returned by the geolocation api
  var userLatLng = new google.maps.LatLng(lattitude, longitude);
  var contentString = "<h4>" + bikeData + "</h4>";
  // Place the marker
  var marker = new google.maps.Marker({
    map: mapObject,
    position: userLatLng,
    animation: google.maps.Animation.DROP,
    icon: "http://www.wmata.com/img/icon-bike.gif"
  });

  marker.addListener('click', function() {
    infowindow.open(mapObject, marker);
  });

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

}

var getPlaces = function(latitude, longitude) {
  var coordinates = new google.maps.LatLng(latitude, longitude);

  var service = new google.maps.places.PlacesService(mapObject);
  service.nearbySearch({
    location: coordinates,
    radius: 5000,
    type: ['store']
  }, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

var infowindow;
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: mapObject,
    position: place.geometry.location
  });

  marker.addListener('click', function() {
    infowindow.open(mapObject, marker);
  });

  var infowindow = new google.maps.InfoWindow({
    content: place.name
  });

}
