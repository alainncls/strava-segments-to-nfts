import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Activity, ActivityDocument} from "./schemas/activity.schema";
import {Model} from "mongoose";
import {IActivityData} from "./activity.interface";

@Injectable()
export class ActivityRepository {
    constructor(@InjectModel('Activity') private activityModel: Model<ActivityDocument>) {
    }

    async findAll(): Promise<Activity[]> {
        return this.activityModel.find().exec();
    }

    async createOrUpdate(activity: IActivityData): Promise<Activity> {
        if (await this.existByStravaId(activity.stravaId)) {
            return this.activityModel.findOneAndUpdate({stravaId: activity.stravaId}, activity, {new: true}).exec()
        } else {
            return (new this.activityModel(activity)).save();
        }
    }

    async delete(id: string) {
        return this.activityModel.deleteOne({id}).exec();
    }

    async findById(id: string): Promise<Activity> {
        return this.activityModel.findById(id).exec();
    }

    async existByStravaId(stravaId: number): Promise<any> {
        return this.activityModel.exists({stravaId}).exec();
    }
}
