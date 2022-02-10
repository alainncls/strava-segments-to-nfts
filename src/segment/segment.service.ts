import {HttpException, Injectable} from '@nestjs/common';
import {CreateSegmentDto} from './dto';
import {ISegmentRO} from './segment.interface';
import {InjectModel} from "@nestjs/mongoose";
import {Segment, SegmentDocument} from "./schemas/segment.schema";
import {Model} from "mongoose";

@Injectable()
export class SegmentService {
    constructor(@InjectModel('Segment') private segmentModel: Model<SegmentDocument>) {
    }

    async findAll(): Promise<ISegmentRO[]> {
        const segments = await this.segmentModel.find().exec();
        return segments.map(segment => SegmentService.buildSegmentRO(segment))
    }

    async create(segmentDto: CreateSegmentDto): Promise<ISegmentRO> {
        const createdSegment = new this.segmentModel(segmentDto);
        return SegmentService.buildSegmentRO(await createdSegment.save());
    }

    async delete(id: number) {
        return this.segmentModel.deleteOne({id}).exec();
    }

    async findById(id: number): Promise<ISegmentRO> {
        const segment = await this.segmentModel.findById(id).exec();

        if (!segment) {
            const errors = {Segment: ' not found'};
            throw new HttpException({errors}, 401);
        }

        return SegmentService.buildSegmentRO(segment);
    }

    private static buildSegmentRO(segment: Segment) {
        const segmentRO = {
            id: segment._id,
            stravaId: segment.stravaId,
            name: segment.name,
            length: segment.length
        };

        return {segment: segmentRO};
    }
}
