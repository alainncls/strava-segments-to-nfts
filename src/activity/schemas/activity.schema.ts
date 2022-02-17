import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id: any;

  @Prop()
  stravaId: number;

  @Prop()
  name: string;

  @Prop()
  segmentsIds: number[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
