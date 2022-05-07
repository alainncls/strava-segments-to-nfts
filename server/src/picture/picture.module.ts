import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { IpfsService } from './ipfs.service';

@Module({
  providers: [PictureService, IpfsService],
  exports: [PictureService, IpfsService],
})
export class PictureModule {}
