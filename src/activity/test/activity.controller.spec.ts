import {Test, TestingModule} from '@nestjs/testing';
import {ActivityController} from '../activity.controller';
import {ActivityService} from "../activity.service";

describe('ActivityController', () => {
    let controller: ActivityController;

    const testActivity = {
        activity: {
            id: 'ID',
            stravaId: 123456,
            name: 'NAME',
            segmentsIds: [123456, 654321]
        }
    };

    const mockActivityService = {
        findAll: jest.fn(() => {
            return [testActivity];
        }),
        createOrUpdate: jest.fn((stravaId: number) => {
            return {
                activity: {
                    id: 'ID',
                    stravaId: stravaId,
                    name: 'NAME',
                    segmentsIds: [123456, 654321]
                }
            };
        }),
        delete: jest.fn(() => {
            return {'deleteCount': 1};
        }),
        findById: jest.fn((id: string) => {
            return id === 'ID' ? {
                activity: {
                    id: 'ID',
                    stravaId: 123456,
                    name: 'NAME',
                    segmentsIds: [123456, 654321]
                }
            } : {Activity: ' not found'};
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ActivityController],
            providers: [ActivityService],
        })
            .overrideProvider(ActivityService)
            .useValue(mockActivityService)
            .compile();

        controller = module.get<ActivityController>(ActivityController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get all activities', async () => {
        expect(await controller.getAllActivities()).toEqual([testActivity]);
    });

    it('should create or update an activity', async () => {
        expect(await controller.createOrUpdateActivity({stravaId: 123456})).toEqual(testActivity);
    });

    it('should delete an activity', async () => {
        expect(await controller.deleteActivity({id: 'ID'})).toEqual({'deleteCount': 1});
    });

    it('should find an activity by its ID', async () => {
        expect(await controller.getActivity({id: 'ID'})).toEqual(testActivity);
    });

    it('should return an error when it cannot find an activity by its ID', async () => {
        expect(await controller.getActivity({id: 'WRONG_ID'})).toEqual({Activity: ' not found'});
    });
});