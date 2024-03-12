import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  pseudo: string;

  @IsEmail(null, { message: 'Invalid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;
}
