const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, { latitude, longitude }) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    console.log("It worked! Returned Coordinates:", { latitude, longitude });

    fetchedCoords = { latitude, longitude };
    fetchISSFlyOverTimes(fetchedCoords, (error, flyoverTime) => {
      if (error) {
        return console.log("It didn't work!", error);
      }
      console.log("It worked! Returned Flyover Time:", flyoverTime);
    });
  });
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
