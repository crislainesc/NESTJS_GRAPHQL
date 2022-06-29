import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString({ message: 'The type entered for the name field is not valid' })
  @IsNotEmpty({ message: 'The name field cannot be empty' })
  @IsOptional()
  name?: string;

  @IsEmail({ message: 'The type entered for the email field is not valid' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'The type entered for the password field is not valid' })
  @IsNotEmpty({ message: 'The password field cannot be empty' })
  @IsOptional()
  password?: string;

  @IsString({ message: 'The type entered for the access profile field is not valid' })
  @IsNotEmpty({ message: 'The access profile field cannot be empty' })
  @IsOptional()
  access_profile?: string;
}
