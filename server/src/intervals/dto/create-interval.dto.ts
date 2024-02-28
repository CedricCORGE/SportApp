import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIntervalDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  repetitions: number;

  @IsNumber()
  @IsNotEmpty()
  work: number;

  @IsNumber()
  @IsNotEmpty()
  rest: number;
}
