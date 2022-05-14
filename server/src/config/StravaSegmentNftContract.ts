import { ContractTransaction, Signer } from 'ethers';
import { StravaSegmentNFT as StravaSegmentNftContractType } from './types/ethers-contracts/StravaSegmentNFT';
import { StravaSegmentNFT__factory } from './types/ethers-contracts';
import OwnershipRecord from '../model/OwnershipRecord';
import { default as networks } from './types/stravaSegmentNftNetworks.json';

class StravaSegmentNftContract {
  private contract: StravaSegmentNftContractType;

  constructor(networkId, etherSigner: Signer) {
    this.contract = StravaSegmentNFT__factory.connect(networks[networkId].address, etherSigner);
  }

  async mintToken(recipient: string, pictureUrl: string, segmentId: string): Promise<ContractTransaction> {
    return this.contract.mintToken(recipient, pictureUrl, segmentId);
  }

  async getOwnershipRecord(recipient, id): Promise<OwnershipRecord> {
    const { tokenId, timestamp, tokenURI, segmentId } = await this.contract.ownershipRecord(recipient, id);
    return new OwnershipRecord(tokenId.toNumber(), timestamp.toNumber(), tokenURI, segmentId);
  }
}

export default StravaSegmentNftContract;
