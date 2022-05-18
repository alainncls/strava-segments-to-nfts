import { Controller, Param, Post } from '@nestjs/common';
import { NftService } from './nft.service';

@Controller('nfts')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post('/:stravaId')
  async minNft(@Param() params): Promise<string[]> {
    return this.nftService.mintNft(Number(params.stravaId));
  }
}
