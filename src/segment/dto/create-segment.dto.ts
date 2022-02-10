import { IsNotEmpty } from 'class-validator';

export class CreateSegmentDto {

  @IsNotEmpty()
  readonly stravaId: number;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly length: number;
}
