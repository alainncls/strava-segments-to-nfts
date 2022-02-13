import {IsNotEmpty} from 'class-validator';

export class CreateActivityDto {

    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly name: string;

    readonly segment_efforts: any[];
}
