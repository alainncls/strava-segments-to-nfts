import { Test, TestingModule } from '@nestjs/testing';
import { NftController } from '../nft.controller';
import { NftService } from '../nft.service';
import OwnershipRecord from '../../model/OwnershipRecord';

describe('NftController', () => {
  let controller: NftController;
  const txHashes = ['txHash1', 'txHash2'];
  const contractAddress = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';
  const ownershipRecord = new OwnershipRecord(2, Date.now(), 'tokenURI', 'segmentId');

  const mockNftService = {
    mintNft: jest.fn(() => txHashes),
    getContractAddress: jest.fn(() => contractAddress),
    getOwnershipRecord: jest.fn(() => ownershipRecord),
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
    expect(await controller.minNft({ segmentsPictures: ['ipfs://cid'], matchingSegmentsIds: [123456] })).toEqual(
      txHashes,
    );
  });

  it('should get ERC721 contract address', async () => {
    expect(await controller.getContractAddress()).toEqual(contractAddress);
  });

  it('should get an NFT ownership record', async () => {
    expect(await controller.getOwnershipRecord({ recipient: 'recipient address', id: 123456 })).toEqual(
      ownershipRecord,
    );
  });
});
