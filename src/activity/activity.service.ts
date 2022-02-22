import { HttpException, Injectable } from '@nestjs/common';
import { IActivityData, IActivityRO } from './activity.interface';
import { Activity } from './schemas/activity.schema';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto';
import { SegmentService } from '../segment/segment.service';
import { PictureService } from '../picture/picture.service';
import { StravaService } from '../strava/strava.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly repository: ActivityRepository,
    private readonly stravaService: StravaService,
    private readonly pictureService: PictureService,
    private readonly segmentService: SegmentService,
  ) {}

  private static buildActivityRO(activity: Activity) {
    const activityRO = {
      id: activity._id,
      stravaId: activity.stravaId,
      name: activity.name,
      segmentsIds: activity.segmentsIds,
      matchingSegmentsIds: activity.matchingSegmentsIds,
    };

    return { activity: activityRO };
  }

  private static buildActivityFromStrava(
    activityDto: CreateActivityDto,
  ): IActivityData {
    return {
      id: undefined,
      stravaId: activityDto.id,
      name: activityDto.name,
      segmentsIds: activityDto.segment_efforts.map(
        (segmentEffort) => segmentEffort.segment.id,
      ),
      matchingSegmentsIds: [],
    };
  }

  async findAll(): Promise<IActivityRO[]> {
    const activities = await this.repository.findAll();
    return activities.map((activity) =>
      ActivityService.buildActivityRO(activity),
    );
  }

  async createOrUpdate(
    stravaToken: string,
    stravaId: number,
  ): Promise<IActivityRO> {
    const activityFromStrava = await this.stravaService.getActivityFromStrava(
      stravaToken,
      stravaId,
    );
    const activityToSave =
      ActivityService.buildActivityFromStrava(activityFromStrava);

    const matchingSegmentsIds = await this.segmentService.findExistingSegments(
      activityToSave.segmentsIds,
    );
    matchingSegmentsIds.forEach((segmentId) =>
      this.pictureService.generatePictureFromSegment(
        this.stravaService.getSegmentFromStrava(stravaToken, segmentId),
      ),
    );

    activityToSave.matchingSegmentsIds = matchingSegmentsIds;

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
