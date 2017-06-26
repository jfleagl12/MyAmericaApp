/**
 * Fetch data from the Google Civic API.
 * https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
 */

const API_KEY = '<API KEY>';
const SERVER = 'https://www.googleapis.com/civicinfo/v2/representatives';
const HOUSE_KEY = 'legislatorLowerBody';
const SENATE_KEY = 'legislatorUpperBody';

function buildUrl (role, address) {
  return `${SERVER}?address=${address}&includeOffices=true&levels=country&roles=${role}&fields=officials&key=${API_KEY}`;
}

export default {
  getRepresentative: function (address) {
    address = encodeURIComponent(address);
    const url = buildUrl(HOUSE_KEY, address);
    return fetch(url).then(r => r.json());
  },

  getSenators: function (address) {
    address = encodeURIComponent(address);
    const url = buildUrl(SENATE_KEY, address);
    return fetch(url).then(r => r.json());
  }
};
