import { HttpException, Injectable } from '@nestjs/common';
import { ISegmentRO } from './segment.interface';
import { Segment } from './schemas/segment.schema';
import { SegmentRepository } from './segment.repository';
import { CreateSegmentDto } from './dto/create-segment.dto';

@Injectable()
export class SegmentService {
  constructor(private readonly repository: SegmentRepository) {}

  private static buildSegmentRO(segment: Segment) {
    const segmentRO = {
      id: segment._id,
      stravaId: segment.stravaId,
      name: segment.name,
      length: segment.length,
    };

    return { segment: segmentRO };
  }

  async findAll(): Promise<ISegmentRO[]> {
    const segments = await this.repository.findAll();
    return segments.map((segment) => SegmentService.buildSegmentRO(segment));
  }

  async create(segmentDto: CreateSegmentDto): Promise<ISegmentRO> {
    return SegmentService.buildSegmentRO(await this.repository.create(segmentDto));
  }

  async update(id: string, segmentDto: CreateSegmentDto): Promise<ISegmentRO> {
    return SegmentService.buildSegmentRO(await this.repository.update(id, segmentDto));
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async findById(id: string): Promise<ISegmentRO> {
    const segment = await this.repository.findById(id);

    if (!segment) {
      const errors = { Segment: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return SegmentService.buildSegmentRO(segment);
  }

  async findExistingSegments(stravaIds: number[]): Promise<number[]> {
    const segmentsChecks: Promise<boolean>[] = stravaIds.map((segmentStravaId) =>
      this.existByStravaId(segmentStravaId),
    );
    const checkResults = await Promise.all(segmentsChecks);
    return stravaIds.filter((_segmentStravaId, index) => checkResults[index]);
  }

  async existByStravaId(stravaId: number): Promise<boolean> {
    return !!(await this.repository.existByStravaId(stravaId));
  }
}
