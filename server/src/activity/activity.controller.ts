import { Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { IActivityRO } from './activity.interface';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  async getAllActivities(): Promise<IActivityRO[]> {
    return this.activityService.findAll();
  }

  @Get('/:id')
  async getActivity(@Param() params): Promise<IActivityRO> {
    return this.activityService.findById(params.id);
  }

  @Post('/:stravaId')
  async createOrUpdateActivity(@Headers('x-strava-token') stravaToken, @Param() params): Promise<IActivityRO> {
    return this.activityService.createOrUpdate(stravaToken, Number(params.stravaId));
  }

  @Delete('/:id')
  async deleteActivity(@Param() params): Promise<any> {
    return this.activityService.delete(params.id);
  }
}
