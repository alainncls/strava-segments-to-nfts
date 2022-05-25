import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { ISegmentRO } from './segment.interface';
import { CreateSegmentDto } from './dto/create-segment.dto';

@Controller('segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Get()
  async getAllSegments(): Promise<ISegmentRO[]> {
    return this.segmentService.findAll();
  }

  @Get('/:id')
  async getSegment(@Param() params): Promise<ISegmentRO> {
    return this.segmentService.findById(params.id);
  }

  @Post()
  async createSegment(@Body() segmentData: CreateSegmentDto) {
    return this.segmentService.create(segmentData);
  }

  @Put('/:id')
  async updateSegment(@Param() params, @Body() segmentData: CreateSegmentDto) {
    return this.segmentService.update(params.id, segmentData);
  }

  @Delete('/:id')
  async deleteSegment(@Param() params): Promise<any> {
    return this.segmentService.delete(params.id);
  }
}
