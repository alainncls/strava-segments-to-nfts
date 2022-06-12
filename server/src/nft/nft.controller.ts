import { Body, Controller, Get, Post } from '@nestjs/common';
import { NftService } from './nft.service';
import { MintNftDto } from './dto/mint-nft.dto';

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
}
