import { ethers, Signer } from 'ethers';
import StravaSegmentNftContract from './StravaSegmentNftContract';

class ContractFactory {
  private etherSigner: Signer;
  private stravaSegmentNft: StravaSegmentNftContract;

  constructor() {
    const nodeUrl =
      process.env.ENVIRONMENT === 'dev'
        ? 'http://localhost:7545'
        : `https://${process.env.CHAIN_NAME}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
    const provider = new ethers.providers.JsonRpcProvider(nodeUrl);
    this.etherSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    this.stravaSegmentNft = new StravaSegmentNftContract(process.env.NETWORK_ID, this.etherSigner);
  }

  getStravaSegmentNftContract(): StravaSegmentNftContract {
    return this.stravaSegmentNft;
  }
}

export default ContractFactory;
