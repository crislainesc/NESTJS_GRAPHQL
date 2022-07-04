import { InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
class UpdateGameObject {
  @IsString({ message: 'The type entered for the game id field is not valid' })
  @IsNotEmpty({ message: 'The min cart value field cannot be empty' })
  @IsOptional()
  game_id: string;

  @IsArray({ message: 'The type entered for the numbers field is not valid' })
  @IsNotEmpty({ message: 'The numbers field cannot be empty' })
  @IsOptional()
  numbers: number[];
}

@InputType()
export class UpdateBetInput {
  @IsArray({ message: 'The type entered for the bets field is not valid' })
  @IsNotEmpty({ message: 'The bets field cannot be empty' })
  @IsOptional()
  bet: UpdateGameObject;
}
