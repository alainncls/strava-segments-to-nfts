import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {CreateSegmentDto} from './dto';
import {SegmentService} from "./segment.service";
import {ISegmentRO} from "./segment.interface";

@Controller('segments')
export class SegmentController {

    constructor(private readonly segmentService: SegmentService) {
    }

    @Get()
    async getAllSegments(): Promise<ISegmentRO[]> {
        return this.segmentService.findAll();
    }

    @Get('/:id')
    async getSegment(@Param() params): Promise<ISegmentRO> {
        return this.segmentService.findById(params.id);
    }

    @Post()
    async create(@Body() segmentData: CreateSegmentDto) {
        return this.segmentService.create(segmentData);
    }

    @Delete('/:id')
    async delete(@Param() params): Promise<any> {
        return this.segmentService.delete(params.id);
    }
}
