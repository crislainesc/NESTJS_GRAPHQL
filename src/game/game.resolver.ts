import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver()
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query(() => [Game])
  async games(): Promise<Game[]> {
    const games = await this.gameService.findAllGames();
    return games;
  }

  @Query(() => Game)
  async game(@Args('id') id: string): Promise<Game> {
    const game = await this.gameService.findGameById(id);
    return game;
  }

  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.createGame(data);
    return game;
  }

  @Mutation(() => Game)
  async updateGame(
    @Args('id') id: string,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const gameUpdated = await this.gameService.updateGame(id, data);
    return gameUpdated;
  }

  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string): Promise<boolean> {
    const gameDeleted = await this.gameService.deleteGame(id);
    return gameDeleted;
  }
}
