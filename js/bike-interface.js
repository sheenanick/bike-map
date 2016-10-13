var Bike = require('./../js/bike.js').bikeModule;
var Map = require('./../js/map.js').mapModule;

var displayTitle = function(location, bikeData, imgData, locations) {
  for (var i = 0; i < bikeData.length; i++) {
    if (imgData[i]) {
      $('.title-display').append("<div class='col-md-3 bike" + clickCount + "'><h4>" + bikeData[i] + "</h4><img class='img-responsive' src='" + imgData[i] + "'></div>");
    } else {
      $('.title-display').append("<div class='col-md-3 bike" + clickCount + "'><h4>" + bikeData[i] + "</h4><img class='img-responsive' src='http://placehold.it/300x300'></div>");
    }
    var map = new Map();
    map.getInfo(locations[i], displayMarkers, bikeData[i]);
  }
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    map: mapObject
  });
};

var currentBikeObject = new Bike();
var map = new Map();
var clickCount = 0;

$('#bike-location').submit(function(event) {
  var clickId = ".bike" + clickCount;
  $(clickId).hide();
  event.preventDefault();
  var location = $('#location').val();
  map.getMap(location, displayMap);
  currentBikeObject.getBike(location, displayTitle);
  location = $('#location').val("");
  clickCount++;

});
