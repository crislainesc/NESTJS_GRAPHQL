import { InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
class CreateGameObject {
  @IsString({ message: 'The type entered for the game id field is not valid' })
  @IsNotEmpty({ message: 'The min cart value field cannot be empty' })
  game_id: string;

  @IsArray({ message: 'The type entered for the numbers field is not valid' })
  @IsNotEmpty({ message: 'The numbers field cannot be empty' })
  numbers: number[];
}

@InputType()
export class CreateBetInput {
  @IsArray({ message: 'The type entered for the bets field is not valid' })
  @IsNotEmpty({ message: 'The bets field cannot be empty' })
  bets: CreateGameObject[];
}
