import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AccessProfileVerifyGuard } from 'src/guards/access.profile.verify.guard';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';
import { GameService } from './game.service';

@Resolver()
export class GameResolver {
  constructor(private gameService: GameService) {}

  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    const games = await this.gameService.findAllGames();
    return games;
  }
  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Query(() => Game)
  async game(@Args('id') id: string): Promise<Game> {
    const game = await this.gameService.findGameById(id);
    return game;
  }
  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Mutation(() => Game)
  async createGame(@Args('data') data: CreateGameInput): Promise<Game> {
    const game = await this.gameService.createGame(data);
    return game;
  }
  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Mutation(() => Game)
  async updateGame(
    @Args('id') id: string,
    @Args('data') data: UpdateGameInput,
  ): Promise<Game> {
    const gameUpdated = await this.gameService.updateGame(id, data);
    return gameUpdated;
  }
  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Mutation(() => Boolean)
  async deleteGame(@Args('id') id: string): Promise<boolean> {
    const gameDeleted = await this.gameService.deleteGame(id);
    return gameDeleted;
  }
}
