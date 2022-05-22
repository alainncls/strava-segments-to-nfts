import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../activity.service';
import { ActivityRepository } from '../activity.repository';
import { HttpException } from '@nestjs/common';
import { SegmentService } from '../../segment/segment.service';
import { PictureService } from '../../picture/picture.service';
import { StravaService } from '../../strava/strava.service';
import { IpfsService } from '../../picture/ipfs.service';

describe('ActivityService', () => {
  let service: ActivityService;
  const cid = 'ipfs cid';
  const txHash = '0x3a2446616cb63174ea0efe2f0fd59e12831ef58af7f2d56cbda63ed5981bc898';
  const STRAVA_ID = 123456;

  const repoActivity = {
    _id: 'ID',
    stravaId: STRAVA_ID,
    name: 'NAME',
    segmentsIds: [123456, 654321],
    matchingSegmentsIds: [654321],
    segmentsPictures: [cid],
    transactionsHashes: [txHash],
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

  const activity = {
    _id: 'ID',
    stravaId: 123456,
    name: 'NAME',
    segmentsIds: [123456, 654321],
    matchingSegmentsIds: [654321],
    segmentsPictures: [cid],
    transactionsHashes: [txHash],
  };

  const resultActivity = {
    activity: {
      id: 'ID',
      stravaId: 123456,
      name: 'NAME',
      segmentsIds: [123456, 654321],
      matchingSegmentsIds: [654321],
      segmentsPictures: [cid],
      transactionsHashes: [txHash],
    },
  };

  const mockActivityRepository = {
    findAll: jest.fn().mockResolvedValue([repoActivity]),
    createOrUpdate: jest.fn().mockResolvedValue(repoActivity),
    delete: jest.fn().mockResolvedValue({ deleteCount: 1 }),
    findById: jest.fn().mockResolvedValue(repoActivity),
    findByStravaId: jest.fn().mockResolvedValue([repoActivity]),
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

  const mockIpfsService = {
    uploadToIpfs: jest.fn(() => cid),
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
        {
          provide: IpfsService,
          useValue: mockIpfsService,
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

  it('should find an activity by its Strava ID', async () => {
    expect(await service.findUniqueByStravaId(STRAVA_ID)).toEqual(activity);
  });

  it('should return an error when it cannot find an activity by its Strava ID', async () => {
    mockActivityRepository.findByStravaId = jest.fn().mockResolvedValue([]);
    await expect(service.findUniqueByStravaId(654321)).rejects.toThrow(HttpException);
  });

  it('should return an error when it finds 2 activities with the same Strava ID', async () => {
    mockActivityRepository.findByStravaId = jest.fn().mockResolvedValue([resultActivity, resultActivity]);
    await expect(service.findUniqueByStravaId(654321)).rejects.toThrow(HttpException);
  });
});
