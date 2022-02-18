import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from './schemas/activity.schema';
import { ActivityRepository } from './activity.repository';
import { StravaService } from './strava.service';
import { SegmentModule } from '../segment/segment.module';
import { PictureModule } from '../picture/picture.module';

@Module({
  controllers: [ActivityController],
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    SegmentModule,
    PictureModule,
  ],
  providers: [ActivityService, StravaService, ActivityRepository],
})
export class ActivityModule {}
