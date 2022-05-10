import { ContractReceipt, ContractTransaction, Event, Signer } from "ethers";
import { StravaSegmentNFT as StravaSegmentNftContractType } from "./types/ethers-contracts/StravaSegmentNFT";
import { StravaSegmentNFT__factory } from "./types/ethers-contracts";
import OwnershipRecord from "../model/OwnershipRecord";

const stravaSegmentNftJson = require("../../../blockchain/build/contracts/StravaSegmentNft.json");
const stravaSegmentNftAddress = stravaSegmentNftJson.networks["5777"].address;

class StravaSegmentNftContract {
  private contract: StravaSegmentNftContractType;

  constructor(etherSigner: Signer) {
    this.contract = StravaSegmentNFT__factory.connect(stravaSegmentNftAddress, etherSigner);
  }

  async mintToken(recipient: string, pictureUrl: string, segmentId: string): Promise<boolean> {
    const transaction: ContractTransaction = await this.contract.mintToken(recipient, pictureUrl, segmentId);
    const receipt: ContractReceipt = await transaction.wait(1);
    const event: Event = receipt.events.pop();
    return !!event;
  }

  async getOwnershipRecord(recipient, id): Promise<OwnershipRecord> {
    const { tokenId, timestamp, tokenURI, segmentId } = await this.contract.ownershipRecord(recipient, id);
    return new OwnershipRecord(tokenId.toNumber(), timestamp.toNumber(), tokenURI, segmentId);
  }
}

export default StravaSegmentNftContract;