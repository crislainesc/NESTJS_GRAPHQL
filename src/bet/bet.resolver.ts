import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

@Resolver()
export class BetResolver {
  constructor(private betService: BetService) {}

  @Query(() => [Bet])
  async bets(): Promise<Bet[]> {
    const bets = await this.betService.findAllBets();
    return bets;
  }

  @Query(() => Bet)
  async bet(@Args('id') id: string): Promise<Bet> {
    const bet = await this.betService.findBetById(id);
    return bet;
  }

  @Query(() => [Bet])
  async betsByUserId(@Args('userId') userId: string): Promise<Bet[]> {
    const bets = await this.betService.findBetsByUserId(userId);
    return bets;
  }

  @Query(() => [Bet])
  async betsByGameId(
    @Args('userId') userId: string,
    @Args('gameId') gameId: string,
  ): Promise<Bet[]> {
    const bets = await this.betService.findBetsByGameId(userId, gameId);
    return bets;
  }

  @Mutation(() => [Bet])
  async createBet(@Args('data') data: CreateBetInput): Promise<Bet[]> {
    const bet = await this.betService.createBet(data);
    return bet;
  }

  @Mutation(() => Bet)
  async updateBet(
    @Args('id') id: string,
    @Args('data') data: UpdateBetInput,
  ): Promise<any> {
    const bet = await this.betService.updateBet(id, data);
    return bet;
  }

  @Mutation(() => Boolean)
  async deleteBet(@Args('id') id: string): Promise<boolean> {
    const betDeleted = await this.betService.deleteBet(id);
    return betDeleted;
  }
}
