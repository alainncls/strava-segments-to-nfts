import {Injectable} from '@nestjs/common';
import strava from 'strava-v3';

@Injectable()
export class StravaService {

    async getActivityFromStrava(stravaId: number): Promise<any> {
        // FIXME: really temporary!
        const stravaApi = new strava.client('XXX');
        return stravaApi.activities.get({id: stravaId, include_all_efforts: true});
    }
}
