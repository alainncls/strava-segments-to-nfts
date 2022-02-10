import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type SegmentDocument = Segment & Document;

@Schema()
export class Segment {

    _id: any;

    @Prop()
    stravaId: number;

    @Prop()
    name: string;

    @Prop()
    length: number;
}

export const SegmentSchema = SchemaFactory.createForClass(Segment);