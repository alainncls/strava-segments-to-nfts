import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../activity.service';
import { INestApplication } from '@nestjs/common';
import { ActivityController } from '../activity.controller';

describe('Activities', () => {
  let app: INestApplication;
  const mockActivityService = {
    findAll: jest.fn(() => {
      return [
        {
          activity: {
            id: 'ID',
            stravaId: 123456,
            name: 'ACTIVITY_NAME',
            segmentsIds: [123456, 654321],
            matchingSegmentsIds: [654321],
          },
        },
      ];
    }),
    createOrUpdate: jest.fn((stravaToken: string, stravaId: number) => {
      return {
        activity: {
          id: 'ID',
          stravaId: stravaId,
          name: 'NAME',
          segmentsIds: [123456, 654321],
          matchingSegmentsIds: [654321],
        },
      };
    }),
    delete: jest.fn(() => {
      return { deleteCount: 1 };
    }),
    findById: jest.fn((id: string) => {
      return id === 'ID'
        ? {
            activity: {
              id: 'ID',
              stravaId: 123456,
              name: 'NAME',
              segmentsIds: [123456, 654321],
              matchingSegmentsIds: [654321],
            },
          }
        : { Activity: ' not found' };
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService],
    })
      .overrideProvider(ActivityService)
      .useValue(mockActivityService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET activities`, () => {
    return request(app.getHttpServer())
      .get('/activities')
      .expect(200)
      .expect(mockActivityService.findAll());
  });

  it(`/GET activity`, () => {
    return request(app.getHttpServer())
      .get('/activities/ID')
      .expect(200)
      .expect(mockActivityService.findById('ID'));
  });

  it(`/POST activities`, () => {
    return request(app.getHttpServer())
      .post('/activities/123456')
      .set('x-strava-token', 'STRAVA_TOKEN')
      .expect(201)
      .expect(mockActivityService.createOrUpdate('STRAVA_TOKEN', 123456));
  });

  it(`/DELETE activities/ID`, () => {
    return request(app.getHttpServer())
      .delete('/activities/ID')
      .expect(200)
      .expect(mockActivityService.delete());
  });

  afterAll(async () => {
    await app.close();
  });
});
