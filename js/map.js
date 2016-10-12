apiKey = require('./../.env').apiKey;

Map = function() {
};

Map.prototype.getMap = function(location, displayFunction) {
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key" + apiKey).then(function(response) {
    console.log(response);
    displayFunction(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng);
  });
};

exports.mapModule = Map;
