import { Injectable } from '@nestjs/common';
import { IActivityData } from './activity.interface';
import ContractFactory from '../config/ContractFactory';
import { ContractTransaction } from 'ethers';

@Injectable()
export class NftService {
  async mintNft(activityToSave: IActivityData): Promise<string[]> {
    const contractFactory = new ContractFactory();
    const contract = contractFactory.getStravaSegmentNftContract();
    const txHashes: string[] = [];

    for (let i = 0; i < activityToSave.segmentsPictures.length; i++) {
      const contractTransaction: ContractTransaction = await contract.mintToken(
        process.env.RECIPIENT,
        activityToSave.segmentsPictures[i],
        activityToSave.matchingSegmentsIds[i].toString(),
      );
      txHashes.push(contractTransaction.hash);
    }

    return txHashes;
  }
}
