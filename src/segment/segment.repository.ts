import {Injectable} from '@nestjs/common';
import {CreateSegmentDto} from './dto';
import {InjectModel} from "@nestjs/mongoose";
import {Segment, SegmentDocument} from "./schemas/segment.schema";
import {Model} from "mongoose";

@Injectable()
export class SegmentRepository {
    constructor(@InjectModel('Segment') private segmentModel: Model<SegmentDocument>) {
    }

    async findAll(): Promise<Segment[]> {
        return this.segmentModel.find().exec();
    }

    async create(segmentDto: CreateSegmentDto): Promise<Segment> {
        return (new this.segmentModel(segmentDto)).save();
    }

    async update(id: string, segmentDto: CreateSegmentDto): Promise<Segment> {
        return this.segmentModel.findByIdAndUpdate(id, segmentDto, {new: true}).exec();
    }

    async delete(id: string) {
        return this.segmentModel.deleteOne({id}).exec();
    }

    async findById(id: string): Promise<Segment> {
        return this.segmentModel.findById(id).exec();
    }
}
