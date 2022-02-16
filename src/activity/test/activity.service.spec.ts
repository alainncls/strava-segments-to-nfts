import {Test, TestingModule} from '@nestjs/testing';
import {ActivityService} from "../activity.service";
import {ActivityRepository} from "../activity.repository";
import {HttpException} from "@nestjs/common";
import {StravaService} from "../strava.service";
import {PictureService} from "../picture.service";
import {SegmentService} from "../../segment/segment.service";

describe('ActivityService', () => {
    let service: ActivityService;

    const repoActivity = {
        _id: 'ID',
        stravaId: 123456,
        name: 'NAME',
        segmentsIds: [123456, 654321]
    };

    const stravaActivity = {
        id: 123456,
        name: 'NAME',
        segment_efforts: [{segment: {id: 123456}}, {segment: {id: 654321}}]
    };

    const resultActivity = {
        activity: {
            id: 'ID',
            stravaId: 123456,
            name: 'NAME',
            segmentsIds: [123456, 654321]
        }
    };

    const mockActivityRepository = {
        findAll: jest.fn().mockResolvedValue([repoActivity]),
        createOrUpdate: jest.fn().mockResolvedValue(repoActivity),
        delete: jest.fn().mockResolvedValue({'deleteCount': 1}),
        findById: jest.fn().mockResolvedValue(repoActivity)
    };

    const mockStravaService = {
        getActivityFromStrava: jest.fn().mockResolvedValue(stravaActivity)
    };

    const mockPictureService = {
        generatePictureFromSegment: jest.fn()
    };

    const testSegment = {
        segment: {
            id: 'ID',
            stravaId: 123456,
            name: 'SEGMENT_NAME',
            length: 17
        }
    };

    const mockSegmentService = {
        findAll: jest.fn(() => [testSegment]),
        findExistingSegments: jest.fn(() => [123456, 654321])
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
                }
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
        expect(await service.createOrUpdate(123456)).toEqual(resultActivity);
    });

    it('should delete an activity', async () => {
        expect(await service.delete('ID')).toEqual({'deleteCount': 1});
    });

    it('should find an activity by its ID', async () => {
        expect(await service.findById('ID')).toEqual(resultActivity);
    });

    it('should return an error when it cannot find an activity by its ID', async () => {
        mockActivityRepository.findById = jest.fn().mockResolvedValue(undefined)
        await expect(service.findById('WRONG_ID')).rejects.toThrow(HttpException);
    });
});