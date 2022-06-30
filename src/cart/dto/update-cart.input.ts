import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateCartInput {
  @IsNumber()
  @IsNotEmpty({ message: 'The min cart value field cannot be empty' })
  @IsOptional()
  min_cart_value?: number;
}
