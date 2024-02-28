import { PartialType } from '@nestjs/mapped-types';
import { CreateIntervalDto } from './create-interval.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateIntervalDto extends PartialType(CreateIntervalDto) {
  @IsString()
  name: string;

  @IsNumber()
  repetitions: number;

  @IsNumber()
  work: number;

  @IsNumber()
  rest: number;
}
