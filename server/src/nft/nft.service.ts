import { Injectable } from '@nestjs/common';
import ContractFactory from '../config/ContractFactory';
import { ContractTransaction } from 'ethers';
import { MintNftDto } from './dto/mint-nft.dto';

@Injectable()
export class NftService {
  async mintNft(mintNftDto: MintNftDto): Promise<string[]> {
    // TODO: Ether signer should be the user (not the platform)
    const contractFactory = new ContractFactory();
    const contract = contractFactory.getStravaSegmentNftContract();
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
    const contractFactory = new ContractFactory();
    const contract = contractFactory.getStravaSegmentNftContract();
    return contract.getContractAddress();
  }
}
