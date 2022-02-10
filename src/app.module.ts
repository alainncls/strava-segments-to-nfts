import {Module} from '@nestjs/common';
import {SegmentModule} from "./segment/segment.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        SegmentModule,
    ]
})
export class AppModule {
}
