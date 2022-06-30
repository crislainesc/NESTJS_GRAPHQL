import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateCartInput {
  @IsNumber()
  @IsNotEmpty({ message: 'The min cart value field cannot be empty' })
  min_cart_value: number;
}
