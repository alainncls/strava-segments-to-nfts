import { Injectable } from '@nestjs/common';
import ContractFactory from '../config/ContractFactory';
import { ContractTransaction } from 'ethers';
import { ActivityService } from './activity.service';

@Injectable()
export class NftService {
  constructor(private readonly activityService: ActivityService) {}

  async mintNft(activityId: number): Promise<string[]> {
    const activity = await this.activityService.findUniqueByStravaId(activityId);

    // TODO: Ether signer should be the user (not the platform)
    const contractFactory = new ContractFactory();
    const contract = contractFactory.getStravaSegmentNftContract();
    const txHashes: string[] = [];

    // TODO: get NFT recipient public address from a MetaMask login

    for (let i = 0; i < activity.segmentsPictures.length; i++) {
      const contractTransaction: ContractTransaction = await contract.mintToken(
        process.env.RECIPIENT,
        activity.segmentsPictures[i],
        activity.matchingSegmentsIds[i].toString(),
      );
      txHashes.push(contractTransaction.hash);
    }

    return txHashes;
  }
}
