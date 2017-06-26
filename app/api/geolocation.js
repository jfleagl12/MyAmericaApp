/**
 * react-native Geolocation API.
 * @see https://facebook.github.io/react-native/docs/geolocation.html
 */

const HIGH_ACCURACY = true;
const TIMEOUT = 7000;
const MAX_AGE = 60000;

export default {
  getLocation: function () {
    return new Promise((resolve, reject) => {
      // getCurrentPosition (success, fail, options)
      navigator.geolocation.getCurrentPosition(
        (results) => {
          resolve(results.coords);
        },
        (error) => {
          reject(JSON.stringify(error));
        },
        {
          timeout: TIMEOUT,
          maximumAge: MAX_AGE,
          enableHighAccuracy: HIGH_ACCURACY
        }
      );
    });
  }
}
