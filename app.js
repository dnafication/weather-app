const request = require('request');

require('dotenv').config();

const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/sydney.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/`;

request(mapboxUrl, { json: true }, function(err, response, body) {
  console.log('error:', err || 'no error');
  console.log('response code:', response && response.statusCode);
  const place = body.features[0];
  console.log('coordinates:', place.center);
  console.log('name:', place.place_name);

  request(url + place.center.reverse().join(), { json: true }, function(
    err,
    response,
    body
  ) {
    console.log('error:', err || 'no error');
    console.log('response code:', response && response.statusCode);
    if (response.statusCode === 200) {
      console.log('summary:', body.currently.summary);
      console.log('chance of rain:', body.currently.precipProbability);
      console.log('temperature:', body.currently.temperature);
    } else {
      console.log('actual body:', body);
    }
  });
});
