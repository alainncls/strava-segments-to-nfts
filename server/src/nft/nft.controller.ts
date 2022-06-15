import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './dto/mint-nft.dto';
import OwnershipRecord from '../model/OwnershipRecord';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post()
  async minNft(@Body() mintNftDto: MintNftDto): Promise<string[]> {
    return this.nftService.mintNft(mintNftDto);
  }

  @Get()
  async getContractAddress(): Promise<string> {
    return this.nftService.getContractAddress();
  }

  @Get()
  async getOwnershipRecord(@Query() query): Promise<OwnershipRecord> {
    return this.nftService.getOwnershipRecord(query.recipient, query.id);
  }
}
