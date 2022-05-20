import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from '../nft.controller';
import { NftService } from '../nft.service';

describe('NftController', () => {
  let controller: NftController;
  const txHashes = ['txHash1', 'txHash2'];

  const mockNftService = {
    mintNft: jest.fn(() => {
      return txHashes;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftController],
      providers: [NftService],
    })
      .overrideProvider(NftService)
      .useValue(mockNftService)
      .compile();

    controller = module.get<NftController>(NftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should mint NFTs and return the tx hashes', async () => {
    expect(await controller.minNft({ id: 'STRAVA_ID' })).toEqual(txHashes);
  });
});
