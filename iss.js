const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, resp, body) => {
    if (error) {
      return callback(("Error is: ", error), null);
    }
    if (resp.statusCode !== 200) {
      callback(
        Error(`Status Code ${resp.statusCode} when fetching IP: ${body}`),
        null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, resp, body) => {
    if (error) {
      return callback(("Error is: ", error), null);
    }
    if (resp.statusCode !== 200) {
      callback(
        Error(`Status Code ${resp.statusCode} when fetching IP: ${body}`),
        null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;  request(url, (error, resp, body) => {
    if (error) {
      return callback(("Error is: ", error), null);
    }
    if (resp.statusCode !== 200) {
      callback(
        Error(`Status Code ${resp.statusCode} when fetching IP: ${body}`),
        null);
      return;
    }
    const flytime = JSON.parse(body).response;
    callback(null, flytime);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
