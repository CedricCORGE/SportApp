import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Interval } from 'src/intervals/entities/interval.entity';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  duration: number;

  interval: Interval;
}
