const StravaSegmentNFT = artifacts.require('StravaSegmentNFT');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');

contract('StravaSegmentNFT', (accounts) => {
  const firstAccount = accounts[0];
  const secondAccount = accounts[1];

  let stravaSegmentNFTContract;

  const tokenUrl = 'URL';
  const segmentId = 'segmentId';

  beforeEach('should setup a new contract instance', async () => {
    stravaSegmentNFTContract = await StravaSegmentNFT.new();
  });

  it('should mint a token', async () => {
    await stravaSegmentNFTContract.mintToken(secondAccount, tokenUrl, segmentId);
    const result = await stravaSegmentNFTContract.ownershipRecord(secondAccount, 0);
    assert.equal(result.tokenId, 0);
    assert.equal(result.tokenURI, tokenUrl);
    assert.equal(result.segmentId, segmentId);
  });

  it("shouldn't be able to mint a token if recipient is the owner", async () => {
    await truffleAssert.reverts(
      stravaSegmentNFTContract.mintToken(firstAccount, tokenUrl, segmentId),
      'Recipient cannot be the owner of the contract',
    );
  });
});
