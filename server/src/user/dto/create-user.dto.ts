import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must have at least 2 characters' })
  name: string;

  @IsEmail(null, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  password: string;

  @IsInt()
  weight: number;

  @IsInt()
  height: number;

  @IsString()
  @IsEnum(['m', 'f'])
  gender: string;
}
