import {Module} from '@nestjs/common';
import {ActivityController} from './activity.controller';
import {ActivityService} from './activity.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ActivitySchema} from "./schemas/activity.schema";
import {ActivityRepository} from "./activity.repository";
import {StravaService} from "./strava.service";

@Module({
    controllers: [ActivityController],
    imports: [MongooseModule.forFeature([{name: 'Activity', schema: ActivitySchema}])],
    providers: [ActivityService, StravaService, ActivityRepository],
})
export class ActivityModule {
}
