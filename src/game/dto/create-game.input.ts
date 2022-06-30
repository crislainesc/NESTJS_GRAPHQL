import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateGameInput {
  @IsString({ message: 'The type entered for the type field is not valid' })
  @IsNotEmpty({ message: 'The type field cannot be empty' })
  type: string;

  @IsString({
    message: 'The type entered for the description field is not valid',
  })
  @IsNotEmpty({ message: 'The description field cannot be empty' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: 'The range field cannot be empty' })
  range: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The price field cannot be empty' })
  price: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The max number field cannot be empty' })
  max_number: number;

  @IsString({ message: 'The type entered for the color field is not valid' })
  @IsNotEmpty({ message: 'The color field cannot be empty' })
  color: string;
}
