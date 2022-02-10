import {Module} from '@nestjs/common';
import {SegmentController} from './segment.controller';
import {SegmentService} from './segment.service';
import {MongooseModule} from "@nestjs/mongoose";
import {SegmentSchema} from "./schemas/segment.schema";

@Module({
    controllers: [SegmentController],
    imports: [MongooseModule.forFeature([{name: 'Segment', schema: SegmentSchema}])],
    providers: [SegmentService],
})
export class SegmentModule {
}
