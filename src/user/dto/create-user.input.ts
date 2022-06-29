import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString({ message: 'The type entered for the name field is not valid' })
  @IsNotEmpty({ message: 'The name field cannot be empty' })
  name: string;

  @IsEmail({ message: 'The type entered for the email field is not valid' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  email: string;

  @IsString({ message: 'The type entered for the password field is not valid' })
  @IsNotEmpty({ message: 'The password field cannot be empty' })
  password: string;
}
