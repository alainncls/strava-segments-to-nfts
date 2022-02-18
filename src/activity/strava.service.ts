import { Injectable } from '@nestjs/common';
import strava from 'strava-v3';

@Injectable()
export class StravaService {
  async getActivityFromStrava(stravaId: number): Promise<any> {
    return strava.activities.get({
      id: stravaId,
      include_all_efforts: true,
      access_token: 'XXX',
    });
  }

  async getSegmentFromStrava(stravaId: number): Promise<any> {
    return strava.segments.get({
      id: stravaId,
      access_token: 'XXX',
    });
  }
}
