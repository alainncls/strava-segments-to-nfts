import { Injectable } from '@nestjs/common';
import strava from 'strava-v3';

@Injectable()
export class StravaService {
  async getActivityFromStrava(
    stravaToken: string,
    stravaId: number,
  ): Promise<any> {
    return strava.activities.get({
      id: stravaId,
      include_all_efforts: true,
      access_token: stravaToken,
    });
  }

  async getSegmentFromStrava(
    stravaToken: string,
    stravaId: number,
  ): Promise<any> {
    return strava.segments.get({
      id: stravaId,
      access_token: stravaToken,
    });
  }
}
