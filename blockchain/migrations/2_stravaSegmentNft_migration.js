const StravaSegmentNFT = artifacts.require('StravaSegmentNFT');

module.exports = async function (deployer) {
  await deployer.deploy(StravaSegmentNFT);
};