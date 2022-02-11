import {Test, TestingModule} from '@nestjs/testing';
import {SegmentService} from "../segment.service";
import {SegmentRepository} from "../segment.repository";
import {HttpException} from "@nestjs/common";

describe('SegmentService', () => {
    let service: SegmentService;

    const repoSegment = {
        _id: 'ID',
        stravaId: 123456,
        name: 'SEGMENT_NAME',
        length: 17
    };

    const resultSegment = {
        segment: {
            id: 'ID',
            stravaId: 123456,
            name: 'SEGMENT_NAME',
            length: 17
        }
    };

    const mockSegmentRepository = {
        findAll: jest.fn().mockResolvedValue([repoSegment]),
        create: jest.fn().mockResolvedValue(repoSegment),
        update: jest.fn().mockResolvedValue({...repoSegment, name: 'NEW_SEGMENT_NAME'}),
        delete: jest.fn().mockResolvedValue({'deleteCount': 1}),
        findById: jest.fn().mockResolvedValue(repoSegment),
    };

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SegmentService,
                {
                    provide: SegmentRepository,
                    useValue: mockSegmentRepository,
                }
            ],
        }).compile();

        service = module.get<SegmentService>(SegmentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should get all segments', async () => {
        expect(await service.findAll()).toEqual([resultSegment]);
    });

    it('should create a segment', async () => {
        expect(await service.create({
            stravaId: 123456,
            name: 'SEGMENT_NAME',
            length: 17
        })).toEqual(resultSegment);
    });

    it('should update a segment', async () => {
        expect(await service.update('ID', {
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
        expect(await service.delete('ID')).toEqual({'deleteCount': 1});
    });

    it('should find a segment by its ID', async () => {
        expect(await service.findById('ID')).toEqual(resultSegment);
    });

    it('should return an error when it cannot find a segment by its ID', async () => {
        mockSegmentRepository.findById = jest.fn().mockResolvedValue(undefined)
        await expect(service.findById('WRONG_ID')).rejects.toThrow(HttpException);
    });
});