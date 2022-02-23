import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../activity.service';
import { ActivityRepository } from '../activity.repository';
import { HttpException } from '@nestjs/common';
import { SegmentService } from '../../segment/segment.service';
import { PictureService } from '../../picture/picture.service';
import { StravaService } from '../../strava/strava.service';

describe('ActivityService', () => {
  let service: ActivityService;

  const repoActivity = {
    _id: 'ID',
    stravaId: 123456,
    name: 'NAME',
    segmentsIds: [123456, 654321],
    matchingSegmentsIds: [654321],
    segmentsPictures: [],
  };

  const stravaActivity = {
    id: 123456,
    name: 'NAME',
    segment_efforts: [{ segment: { id: 123456 } }, { segment: { id: 654321 } }],
  };

  const stravaSegment = {
    _id: 'ID',
    stravaId: 123456,
    name: 'SEGMENT_NAME',
    distance: 1706.4,
    activity_type: 'Ride',
    map: {
      polyline:
        '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
    },
  };

  const resultActivity = {
    activity: {
      id: 'ID',
      stravaId: 123456,
      name: 'NAME',
      segmentsIds: [123456, 654321],
      matchingSegmentsIds: [654321],
      segmentsPictures: [],
    },
  };

  const mockActivityRepository = {
    findAll: jest.fn().mockResolvedValue([repoActivity]),
    createOrUpdate: jest.fn().mockResolvedValue(repoActivity),
    delete: jest.fn().mockResolvedValue({ deleteCount: 1 }),
    findById: jest.fn().mockResolvedValue(repoActivity),
  };

  const mockStravaService = {
    getActivityFromStrava: jest.fn().mockResolvedValue(stravaActivity),
    getSegmentFromStrava: jest.fn().mockResolvedValue(stravaSegment),
  };

  const mockPictureService = {
    generatePictureFromSegment: jest.fn(),
  };

  const testSegment = {
    segment: {
      id: 'ID',
      stravaId: 123456,
      name: 'SEGMENT_NAME',
      length: 17,
    },
  };

  const mockSegmentService = {
    findAll: jest.fn(() => [testSegment]),
    findExistingSegments: jest.fn(() => [123456, 654321]),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: ActivityRepository,
          useValue: mockActivityRepository,
        },
        {
          provide: StravaService,
          useValue: mockStravaService,
        },
        {
          provide: PictureService,
          useValue: mockPictureService,
        },
        {
          provide: SegmentService,
          useValue: mockSegmentService,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all activities', async () => {
    expect(await service.findAll()).toEqual([resultActivity]);
  });

  it('should create or update an activity', async () => {
    expect(await service.createOrUpdate('STRAVA_TOKEN', 123456)).toEqual(resultActivity);
  });

  it('should delete an activity', async () => {
    expect(await service.delete('ID')).toEqual({ deleteCount: 1 });
  });

  it('should find an activity by its ID', async () => {
    expect(await service.findById('ID')).toEqual(resultActivity);
  });

  it('should return an error when it cannot find an activity by its ID', async () => {
    mockActivityRepository.findById = jest.fn().mockResolvedValue(undefined);
    await expect(service.findById('WRONG_ID')).rejects.toThrow(HttpException);
  });
});
