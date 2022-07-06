import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { AccessProfileVerifyGuard } from 'src/guards/access.profile.verify.guard';
import { Bet } from './bet.entity';
import { BetService } from './bet.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

@Resolver()
export class BetResolver {
  constructor(private betService: BetService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async bets(): Promise<Bet[]> {
    const bets = await this.betService.findAllBets();
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Bet)
  async bet(@Args('id') id: string): Promise<Bet> {
    const bet = await this.betService.findBetById(id);
    return bet;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async betsByUserId(@Args('userId') userId: string): Promise<Bet[]> {
    const bets = await this.betService.findBetsByUserId(userId);
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Bet])
  async betsByGameId(
    @Args('userId') userId: string,
    @Args('gameId') gameId: string,
  ): Promise<Bet[]> {
    const bets = await this.betService.findBetsByGameId(userId, gameId);
    return bets;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [Bet])
  async createBet(@Args('data') data: CreateBetInput): Promise<Bet[]> {
    const bet = await this.betService.createBet(data);
    return bet;
  }

  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Mutation(() => Bet)
  async updateBet(
    @Args('id') id: string,
    @Args('data') data: UpdateBetInput,
  ): Promise<any> {
    const bet = await this.betService.updateBet(id, data);
    return bet;
  }

  @UseGuards(GqlAuthGuard, AccessProfileVerifyGuard)
  @Mutation(() => Boolean)
  async deleteBet(@Args('id') id: string): Promise<boolean> {
    const betDeleted = await this.betService.deleteBet(id);
    return betDeleted;
  }
}
