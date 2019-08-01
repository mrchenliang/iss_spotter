const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
// const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, { latitude, longitude }) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    console.log("It worked! Returned Coordinates:", {latitude, longitude});
   
    const fetchedCoords = { latitude, longitude };
    fetchISSFlyOverTimes(fetchedCoords, (error, flyoverTime) => {
      if (error) {
        console.log("It didn't work!", error);
        return;
      }
      console.log("It worked! Returned Flyover Time", flyoverTime);
    });
  });
});
