const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

  request(url, { json: true }, function(err, response, body) {
    if (err) {
      console.error(
        'error:',
        'Unable to connect to location services' || 'no error'
      );
      callback(err, null);
      return;
    }
    if (body.features.length > 0) {
      const place = body.features[0];
      const latitude = place.center[1];
      const longitude = place.center[0];
      const location = place.place_name;

      callback(null, { latitude, longitude, location });
    } else {
      console.error('Your query returned with zero locations');
    }
  });
};

module.exports = geocode;
