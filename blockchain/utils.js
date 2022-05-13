const stravaSegmentNftJson = require('./build/contracts/StravaSegmentNFT.json');
const stravaSegmentNftNetworks = JSON.stringify(stravaSegmentNftJson.networks);
const fs = require('fs');

fs.writeFile('./stravaSegmentNftNetworks.json', stravaSegmentNftNetworks, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('stravaSegmentNftNetworks.json file written successfully!');
});
