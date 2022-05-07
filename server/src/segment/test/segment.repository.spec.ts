import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Segment, SegmentDocument } from '../schemas/segment.schema';
import { SegmentRepository } from '../segment.repository';

describe('SegmentRepository', () => {
  let mockSegmentModel: Model<SegmentDocument>;
  let mockRepository: SegmentRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('Segment'),
          useValue: Model,
        },
        SegmentRepository,
      ],
    }).compile();
    mockSegmentModel = module.get<Model<SegmentDocument>>(getModelToken('Segment'));
    mockRepository = module.get<SegmentRepository>(SegmentRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  it('should find all segments', async () => {
    const segment = new Segment();
    const spy = jest.spyOn(mockSegmentModel, 'find').mockResolvedValue([segment] as SegmentDocument[]);
    await mockRepository.findAll();
    expect(spy).toBeCalled();
  });

  it('should update a segment', async () => {
    const segment = new Segment();
    const segmentId = 'ID';
    const spy = jest.spyOn(mockSegmentModel, 'findByIdAndUpdate').mockResolvedValue(segment as SegmentDocument);
    await mockRepository.update(segmentId, segment);
    expect(spy).toBeCalled();
  });

  it('should delete a segment', async () => {
    const response = { deletedCount: 1 };
    const segmentId = 'ID';
    const spy = jest.spyOn(mockSegmentModel, 'deleteOne').mockResolvedValue(response as any);
    await mockRepository.delete(segmentId);
    expect(spy).toBeCalled();
  });

  it('should find a segment by its ID', async () => {
    const segment = new Segment();
    const segmentId = 'ID';
    const spy = jest.spyOn(mockSegmentModel, 'findById').mockResolvedValue(segment as SegmentDocument);
    await mockRepository.findById(segmentId);
    expect(spy).toBeCalled();
  });

  it('should check if a segment exists', async () => {
    const stravaId = 123456;
    const segment = {
      stravaId,
    };
    const spy = jest.spyOn(mockSegmentModel, 'exists').mockResolvedValue(segment as SegmentDocument);
    await mockRepository.existByStravaId(stravaId);
    expect(spy).toBeCalled();
  });
});
