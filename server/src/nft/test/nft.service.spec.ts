import { Test, TestingModule } from '@nestjs/testing';
import { NftService } from '../nft.service';
import { ActivityService } from '../../activity/activity.service';

const hash = '0x3a2446616cb63174ea0efe2f0fd59e12831ef58af7f2d56cbda63ed5981bc898';

const mockMintToken = jest.fn().mockImplementation(() => {
  return {
    hash,
  };
});

const mockStravaSegmentNftContract = jest.fn().mockImplementation(() => {
  return { mintToken: mockMintToken };
});

jest.mock('../../config/ContractFactory', () => {
  return jest.fn().mockImplementation(() => {
    return { getStravaSegmentNftContract: mockStravaSegmentNftContract };
  });
});

describe('ActivityService', () => {
  let service: NftService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NftService],
    }).compile();
    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mint NFTs', async () => {
    expect(
      await service.mintNft({
        segmentsPictures: ['ipfs://cid'],
        matchingSegmentsIds: [123456],
      }),
    ).toEqual([hash]);
  });
});
