import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SegmentService } from '../segment.service';
import { INestApplication } from '@nestjs/common';
import { SegmentController } from '../segment.controller';
import { CreateSegmentDto } from '../dto/create-segment.dto';

describe('Segments', () => {
  let app: INestApplication;
  const testSegment = {
    segment: {
      id: 'ID',
      stravaId: 123456,
      name: 'SEGMENT_NAME',
      length: 17,
    },
  };
  const mockSegmentService = {
    findAll: jest.fn(() => {
      return [testSegment];
    }),
    create: jest.fn((dto: CreateSegmentDto) => {
      return {
        segment: {
          id: 'ID',
          stravaId: dto.stravaId,
          name: dto.name,
          length: dto.length,
        },
      };
    }),
    update: jest.fn((id, dto: CreateSegmentDto) => {
      return {
        segment: {
          id,
          stravaId: dto.stravaId,
          name: dto.name,
          length: dto.length,
        },
      };
    }),
    delete: jest.fn(() => {
      return { deleteCount: 1 };
    }),
    findById: jest.fn((id: string) => {
      return id === 'ID'
        ? {
            segment: {
              id: 'ID',
              stravaId: 123456,
              name: 'SEGMENT_NAME',
              length: 17,
            },
          }
        : { Segment: ' not found' };
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentController],
      providers: [SegmentService],
    })
      .overrideProvider(SegmentService)
      .useValue(mockSegmentService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET segments`, () => {
    return request(app.getHttpServer()).get('/segments').expect(200).expect(mockSegmentService.findAll());
  });

  it(`/POST segments`, () => {
    const newSegment = {
      stravaId: 123456,
      name: 'SEGMENT_NAME',
      length: 17,
    };
    return request(app.getHttpServer())
      .post('/segments')
      .send(newSegment)
      .expect(201)
      .expect(mockSegmentService.create(newSegment));
  });

  it(`/PUT segments/ID`, () => {
    const updateSegment = {
      stravaId: 123456,
      name: 'NEW_SEGMENT_NAME',
      length: 17,
    };
    return request(app.getHttpServer())
      .put('/segments/ID')
      .send(updateSegment)
      .expect(200)
      .expect(mockSegmentService.update('ID', updateSegment));
  });

  it(`/DELETE segments/ID`, () => {
    return request(app.getHttpServer()).delete('/segments/ID').expect(200).expect(mockSegmentService.delete());
  });

  afterAll(async () => {
    await app.close();
  });
});
