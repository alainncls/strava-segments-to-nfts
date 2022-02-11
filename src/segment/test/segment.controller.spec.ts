import {Test, TestingModule} from '@nestjs/testing';
import {SegmentController} from '../segment.controller';
import {SegmentService} from "../segment.service";
import {CreateSegmentDto} from "../dto";

describe('SegmentController', () => {
    let controller: SegmentController;

    const testSegment = {
        segment: {
            id: 'ID',
            stravaId: 123456,
            name: 'SEGMENT_NAME',
            length: 17
        }
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
                    length: dto.length
                }
            };
        }),
        update: jest.fn((id, dto: CreateSegmentDto) => {
            return {
                segment: {
                    id: 'ID',
                    stravaId: dto.stravaId,
                    name: dto.name,
                    length: dto.length
                }
            };
        }),
        delete: jest.fn(() => {
            return {'deleteCount': 1};
        }),
        findById: jest.fn((id: string) => {
            return id === 'ID' ? {
                segment: {
                    id: 'ID',
                    stravaId: 123456,
                    name: 'SEGMENT_NAME',
                    length: 17
                }
            } :  {Segment: ' not found'};
        }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SegmentController],
            providers: [SegmentService],
        })
            .overrideProvider(SegmentService)
            .useValue(mockSegmentService)
            .compile();

        controller = module.get<SegmentController>(SegmentController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get all segments', async () => {
        expect(await controller.getAllSegments()).toEqual([testSegment]);
    });

    it('should create a segment', async () => {
        expect(await controller.createSegment({
            stravaId: 123456,
            name: 'SEGMENT_NAME',
            length: 17
        })).toEqual(testSegment);
    });

    it('should update a segment', async () => {
        expect(await controller.updateSegment({id: 'ID'}, {
            stravaId: 123456,
            name: 'NEW_SEGMENT_NAME',
            length: 17
        })).toEqual({
            segment: {
                id: 'ID',
                stravaId: 123456,
                name: 'NEW_SEGMENT_NAME',
                length: 17
            }
        });
    });

    it('should delete a segment', async () => {
        expect(await controller.deleteSegment({id: 'ID'})).toEqual({'deleteCount': 1});
    });

    it('should find a segment by its ID', async () => {
        expect(await controller.getSegment({id: 'ID'})).toEqual(testSegment);
    });

    it('should return an error when it cannot find a segment by its ID', async () => {
        expect(await controller.getSegment({id: 'WRONG_ID'})).toEqual({Segment: ' not found'});
    });
});