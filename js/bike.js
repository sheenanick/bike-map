apiKey = require('./../.env').apiKey;

Bike = function() {
};

Bike.prototype.getBike = function(location, displayFunction) {
  var bikes = [];
  var imgs = [];
  var locations = [];
  $.get("https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=" + location + "&proximity_square=100").then(function(response) {
    console.log(response);
    for (var i = 0; i < response.bikes.length; i++) {
      bikes.push(response.bikes[i].title);
      imgs.push(response.bikes[i].thumb);
      locations.push(response.bikes[i].stolen_location);
    }
    displayFunction(location, bikes, imgs, locations);
  });
};
exports.bikeModule = Bike;
