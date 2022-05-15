import { HttpException, Injectable } from '@nestjs/common';
import { IActivityData, IActivityRO } from './activity.interface';
import { Activity } from './schemas/activity.schema';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto';
import { SegmentService } from '../segment/segment.service';
import { PictureService } from '../picture/picture.service';
import { StravaService } from '../strava/strava.service';
import { IpfsService } from '../picture/ipfs.service';
import { NftService } from './nft.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly repository: ActivityRepository,
    private readonly stravaService: StravaService,
    private readonly pictureService: PictureService,
    private readonly segmentService: SegmentService,
    private readonly ipfsService: IpfsService,
    private readonly nftService: NftService,
  ) {}

  private static buildActivityRO(activity: Activity) {
    const activityRO = {
      id: activity._id,
      stravaId: activity.stravaId,
      name: activity.name,
      segmentsIds: activity.segmentsIds,
      matchingSegmentsIds: activity.matchingSegmentsIds,
      segmentsPictures: activity.segmentsPictures,
      transactionsHashes: activity.transactionsHashes,
    };

    return { activity: activityRO };
  }

  private static buildActivityFromStrava(activityDto: CreateActivityDto): IActivityData {
    return {
      id: undefined,
      stravaId: activityDto.id,
      name: activityDto.name,
      segmentsIds: [...new Set(activityDto.segment_efforts.map((segmentEffort) => segmentEffort.segment.id))],
      matchingSegmentsIds: [],
      segmentsPictures: [],
      transactionsHashes: [],
    };
  }

  async findAll(): Promise<IActivityRO[]> {
    const activities = await this.repository.findAll();
    return activities.map((activity) => ActivityService.buildActivityRO(activity));
  }

  async createOrUpdate(stravaToken: string, stravaId: number): Promise<IActivityRO> {
    const activityFromStrava = await this.stravaService.getActivityFromStrava(stravaToken, stravaId);
    const activityToSave = ActivityService.buildActivityFromStrava(activityFromStrava);

    const matchingSegmentsIds = await this.segmentService.findExistingSegments(activityToSave.segmentsIds);
    const generatedPictures = [];

    matchingSegmentsIds.forEach((segmentId) => {
      generatedPictures.push(
        this.pictureService.generatePictureFromSegment(this.stravaService.getSegmentFromStrava(stravaToken, segmentId)),
      );
    });

    activityToSave.matchingSegmentsIds = matchingSegmentsIds;

    if (matchingSegmentsIds.length) {
      const segmentsPictures = await Promise.all(generatedPictures);

      for (const img of segmentsPictures) {
        activityToSave.segmentsPictures.push(`ipfs://${await this.ipfsService.uploadToIpfs(img)}`);
      }

      activityToSave.transactionsHashes = await this.nftService.mintNft(activityToSave);
    }

    const activitySaved = await this.repository.createOrUpdate(activityToSave);
    return ActivityService.buildActivityRO(activitySaved);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async findById(id: string): Promise<IActivityRO> {
    const activity = await this.repository.findById(id);

    if (!activity) {
      const errors = { Activity: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return ActivityService.buildActivityRO(activity);
  }
}
