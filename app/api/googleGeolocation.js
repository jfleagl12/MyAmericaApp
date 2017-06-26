/**
 * Reverse lookup address by Geolocation using the
 * Google Maps Geocoding API.
 * @see https://developers.google.com/maps/documentation/geocoding/start?csw=1#reverse
 */

const API_KEY = '<API KEY>';
const SERVER = 'https://maps.googleapis.com/maps/api/geocode/json';

/*
 * @see https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyBPXNGb0LvUlQy-TK_LGs9AD8dZ8JMWYKQ
 */
formatResults = function (apiResults) {
  let result;

  // Find the result that has type containing 'street_address'.
  const streetRecord = apiResults.results.find((record) => {
    return record.types.indexOf('street_address') !== -1;
  });

  // If none, just use the first result.
  const target = (streetRecord) ? streetRecord : apiResults.results[0];

  return target.formatted_address;
}

export default {
  getAddressByGeolocation: function (geolocation) {
    const { latitude, longitude } = geolocation;
    const url = `${SERVER}?latlng=${latitude},${longitude}&key=${API_KEY}`;

    return fetch(url)
      .then(results => results.json())
      .then(formatResults);
  }
}