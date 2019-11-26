const request = require('request');
const geocode = require('./utils/geocode');

require('dotenv').config(); //load the .env file data into environment variables

const getWeatherForecast = (coordinates, callback) => {
  coordinateString = coordinates.latitude + ',' + coordinates.longitude;
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/`;

  request(url + coordinateString + '?units=auto', { json: true }, function(
    err,
    response,
    body
  ) {
    if (err) {
      console.log(
        'error:',
        'Unable to connect to weather services' || 'no error'
      );
      callback(err, null);
      return;
    }
    console.log('response code:', response && response.statusCode);
    if (response.statusCode === 200) {
      console.log('summary:', body.currently.summary);
      console.log('chance of rain:', body.currently.precipProbability);
      console.log('temperature:', body.currently.temperature);
      callback(null, body.currently);
    } else if (response.statusCode === 400) {
      console.log('error:', body.error);
    } else {
      console.log('actual body:', body);
    }
  });
};

geocode('West ryde', (err, data) => {
  if (err) throw err;
  console.log(data);
  getWeatherForecast(data, (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});

/*
function getLocationCoordinates(query, callback) {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

  request(mapboxUrl, { json: true }, function(err, response, body) {
    if (err) {
      console.log(
        'error:',
        'Unable to connect to location services' || 'no error'
      );
      return;
    }
    console.log('response code:', response && response.statusCode);
    if (body.features.length > 0) {
      const place = body.features[0];
      console.log('coordinates:', place.center);
      console.log('name:', place.place_name);

      getForecast(place.center.reverse().join());
    } else {
      console.log('Your query returned with zero locations');
    }
  });
}

function getForecast(coordinate) {
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/`;
  request(url + coordinate + '?units=auto', { json: true }, function(
    err,
    response,
    body
  ) {
    if (err) {
      console.log(
        'error:',
        'Unable to connect to weather services' || 'no error'
      );
      return;
    }
    console.log('response code:', response && response.statusCode);
    if (response.statusCode === 200) {
      console.log('summary:', body.currently.summary);
      console.log('chance of rain:', body.currently.precipProbability);
      console.log('temperature:', body.currently.temperature);
    } else if (response.statusCode === 400) {
      console.log('error:', body.error);
    } else {
      console.log('actual body:', body);
    }
  });
}

// getLocationCoordinates('west ryde');
// getForecast('sydney');

*/
