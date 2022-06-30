import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateGameInput {
  @IsString({ message: 'The type entered for the type field is not valid' })
  @IsNotEmpty({ message: 'The type field cannot be empty' })
  @IsOptional()
  type?: string;

  @IsString({
    message: 'The type entered for the description field is not valid',
  })
  @IsNotEmpty({ message: 'The description field cannot be empty' })
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'The range field cannot be empty' })
  @IsOptional()
  range?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The price field cannot be empty' })
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'The max number field cannot be empty' })
  @IsOptional()
  max_number?: number;

  @IsString({ message: 'The type entered for the color field is not valid' })
  @IsNotEmpty({ message: 'The color field cannot be empty' })
  @IsOptional()
  color?: string;
}
