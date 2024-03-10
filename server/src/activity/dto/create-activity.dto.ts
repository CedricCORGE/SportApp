import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Interval } from 'src/intervals/entities/interval.entity';

export class CreateActivityDto {
  @IsString()
  name: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  duration: number;

  @IsEnum(['running', 'cycling', 'swimming', 'lifting', 'interval'])
  @IsNotEmpty()
  type: string;

  interval: Interval;
}
