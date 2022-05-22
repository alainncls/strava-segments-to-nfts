import { Module } from '@nestjs/common';
import { SegmentModule } from './segment/segment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './activity/activity.module';
import { ConfigModule } from '@nestjs/config';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    SegmentModule,
    ActivityModule,
    NftModule,
  ],
})
export class AppModule {}
