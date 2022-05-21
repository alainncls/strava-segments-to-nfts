import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../activity.service';
import { NftService } from '../nft.service';

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

  const cid = 'ipfs cid';
  const activityId = 'ID';
  const stravaId = 123456;

  const activity = {
    _id: activityId,
    stravaId: stravaId,
    name: 'NAME',
    segmentsIds: [123456, 654321],
    matchingSegmentsIds: [654321],
    segmentsPictures: [cid],
    transactionsHashes: [hash],
  };

  const mockActivityService = {
    findUniqueByStravaId: jest.fn().mockResolvedValue(activity),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftService,
        {
          provide: ActivityService,
          useValue: mockActivityService,
        },
      ],
    }).compile();
    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should mint NFTs', async () => {
    expect(await service.mintNft(stravaId)).toEqual([hash]);
  });
});
