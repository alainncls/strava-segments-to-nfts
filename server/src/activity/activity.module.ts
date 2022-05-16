import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitySchema } from './schemas/activity.schema';
import { ActivityRepository } from './activity.repository';
import { SegmentModule } from '../segment/segment.module';
import { PictureModule } from '../picture/picture.module';
import { StravaModule } from '../strava/strava.module';
import { NftController } from './nft.controller';

@Module({
  controllers: [ActivityController, NftController],
  imports: [
    MongooseModule.forFeature([{ name: 'Activity', schema: ActivitySchema }]),
    SegmentModule,
    PictureModule,
    StravaModule,
  ],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
