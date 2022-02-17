import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from '../schemas/activity.schema';
import { ActivityRepository } from '../activity.repository';

describe('ActivityRepository', () => {
  let mockActivityModel: Model<ActivityDocument>;
  let mockRepository: ActivityRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken('Activity'),
          useValue: Model,
        },
        ActivityRepository,
      ],
    }).compile();
    mockActivityModel = module.get<Model<ActivityDocument>>(
      getModelToken('Activity'),
    );
    mockRepository = module.get<ActivityRepository>(ActivityRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  it('should find all activities', async () => {
    const activity = new Activity();
    const spy = jest
      .spyOn(mockActivityModel, 'find')
      .mockResolvedValue([activity] as ActivityDocument[]);
    await mockRepository.findAll();
    expect(spy).toBeCalled();
  });

  it('should update an activity', async () => {
    const activity = {
      id: 'ID',
      stravaId: 123456,
      name: 'NAME',
      segmentsIds: [123, 456],
    };
    const spyExists = jest
      .spyOn(mockActivityModel, 'exists')
      .mockResolvedValue(activity as ActivityDocument);
    const spy = jest
      .spyOn(mockActivityModel, 'findOneAndUpdate')
      .mockResolvedValue(activity as ActivityDocument);
    await mockRepository.createOrUpdate(activity);
    expect(spyExists).toBeCalled();
    expect(spy).toBeCalled();
  });

  it('should delete an activity', async () => {
    const response = { deletedCount: 1 };
    const activityId = 'ID';
    const spy = jest
      .spyOn(mockActivityModel, 'deleteOne')
      .mockResolvedValue(response as any);
    await mockRepository.delete(activityId);
    expect(spy).toBeCalled();
  });

  it('should find an activity by its ID', async () => {
    const activity = new Activity();
    const activityId = 'ID';
    const spy = jest
      .spyOn(mockActivityModel, 'findById')
      .mockResolvedValue(activity as ActivityDocument);
    await mockRepository.findById(activityId);
    expect(spy).toBeCalled();
  });
});
