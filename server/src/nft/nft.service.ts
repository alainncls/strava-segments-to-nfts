import { Injectable } from '@nestjs/common';
import ContractFactory from '../config/ContractFactory';
import { ContractTransaction } from 'ethers';
import { MintNftDto } from './dto/mint-nft.dto';
import OwnershipRecord from '../model/OwnershipRecord';
import StravaSegmentNftContract from '../config/StravaSegmentNftContract';

let contract: StravaSegmentNftContract;

@Injectable()
export class NftService {
  constructor() {
    const contractFactory = new ContractFactory();
    contract = contractFactory.getStravaSegmentNftContract();
  }

  async mintNft(mintNftDto: MintNftDto): Promise<string[]> {
    const txHashes: string[] = [];

    // TODO: get NFT recipient public address from a MetaMask login

    for (let i = 0; i < mintNftDto.segmentsPictures.length; i++) {
      const contractTransaction: ContractTransaction = await contract.mintToken(
        process.env.RECIPIENT,
        mintNftDto.segmentsPictures[i],
        mintNftDto.matchingSegmentsIds[i].toString(),
      );
      txHashes.push(contractTransaction.hash);
    }

    return txHashes;
  }

  getContractAddress(): string {
    return contract.getContractAddress();
  }

  async getOwnershipRecord(recipient: string, id: number): Promise<OwnershipRecord> {
    return contract.getOwnershipRecord(recipient, id);
  }
}
