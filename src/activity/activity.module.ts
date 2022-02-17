import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from './schemas/activity.schema';
import { ActivityRepository } from './activity.repository';
import { StravaService } from './strava.service';
import { PictureService } from './picture.service';
import { SegmentModule } from '../segment/segment.module';

@Module({
  controllers: [ActivityController],
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    SegmentModule,
  ],
  providers: [
    ActivityService,
    StravaService,
    PictureService,
    ActivityRepository,
  ],
})
export class ActivityModule {}
