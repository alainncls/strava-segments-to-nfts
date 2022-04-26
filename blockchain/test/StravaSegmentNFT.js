const StravaSegmentNFT = artifacts.require('StravaSegmentNFT');
const assert = require('chai').assert;
const truffleAssert = require('truffle-assertions');

contract('StravaSegmentNFT', (accounts) => {
  const firstAccount = accounts[0];
  const secondAccount = accounts[1];

  let stravaSegmentNFTContract;

  beforeEach('should setup a new contract instance', async () => {
    stravaSegmentNFTContract = await StravaSegmentNFT.new();
  });

  it('should mint a token', async () => {
    const tokenUrl = 'URL';
    await stravaSegmentNFTContract.mintToken(secondAccount, tokenUrl);
    const result = await stravaSegmentNFTContract.ownershipRecord(secondAccount, 0);
    assert.equal(result.tokenId, 0);
    assert.equal(result.tokenURI, tokenUrl);
  });

  it("shouldn't be able to mint a token if recipient is the owner", async () => {
    await truffleAssert.reverts(
      stravaSegmentNFTContract.mintToken(firstAccount, 'URL'),
      'Recipient cannot be the owner of the contract',
    );
  });
});
