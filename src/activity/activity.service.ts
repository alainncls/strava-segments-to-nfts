import {HttpException, Injectable} from '@nestjs/common';
import {IActivityData, IActivityRO} from './activity.interface';
import {Activity} from "./schemas/activity.schema";
import {ActivityRepository} from "./activity.repository";
import {StravaService} from "./strava.service";
import {CreateActivityDto} from "./dto";

@Injectable()
export class ActivityService {
    constructor(private readonly repository: ActivityRepository,
                private readonly stravaService: StravaService) {
    }

    private static buildActivityRO(activity: Activity) {
        const activityRO = {
            id: activity._id,
            stravaId: activity.stravaId,
            name: activity.name,
            segmentsIds: activity.segmentsIds
        };

        return {activity: activityRO};
    }

    private static buildActivityFromStrava(activityDto: CreateActivityDto): IActivityData {
        return {
            id: undefined,
            stravaId: activityDto.id,
            name: activityDto.name,
            segmentsIds: activityDto.segment_efforts.map(segmentEffort => segmentEffort.segment.id)
        };
    }

    async findAll(): Promise<IActivityRO[]> {
        const activities = await this.repository.findAll();
        return activities.map(activity => ActivityService.buildActivityRO(activity))
    }

    async createOrUpdate(stravaId: number): Promise<IActivityRO> {
        const activityFromStrava = await this.stravaService.getActivityFromStrava(stravaId);
        const activityToSave = ActivityService.buildActivityFromStrava(activityFromStrava);
        const activitySaved = await this.repository.createOrUpdate(activityToSave);
        return ActivityService.buildActivityRO(activitySaved);
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }

    async findById(id: string): Promise<IActivityRO> {
        const activity = await this.repository.findById(id);

        if (!activity) {
            const errors = {Activity: ' not found'};
            throw new HttpException({errors}, 401);
        }

        return ActivityService.buildActivityRO(activity);
    }
}
