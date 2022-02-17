import { IsNotEmpty } from 'class-validator';

export class CreateSegmentDto {
  @IsNotEmpty()
  readonly stravaId: number;

  @IsNotEmpty()
  readonly name: string;

  readonly length: number;
}
