import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/cart.entity';
import { Game } from 'src/game/game.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Bet } from './bet.entity';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';

interface IBet {
  numbers: string;
  user_id: string;
  game_id: string;
  price: number;
}

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet) private betRepository: Repository<Bet>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async findAllBets(): Promise<Bet[]> {
    const bets = await this.betRepository.find();
    return bets;
  }

  async findBetById(id: string): Promise<Bet> {
    const bet = await this.betRepository.findOne({ where: { id } });
    return bet;
  }

  async findBetsByUserId(userId: string): Promise<Bet[]> {
    const bets = await this.betRepository.find({ where: { user_id: userId } });
    return bets;
  }

  async findBetsByGameId(userId: string, gameId: string): Promise<Bet[]> {
    const bets = await this.betRepository.find({
      where: { user_id: userId, game_id: gameId },
    });
    return bets;
  }

  async createBet(data: CreateBetInput): Promise<Bet[]> {
    try {
      const betsToSave: IBet[] = [];

      const totalBets = data.bets.map(async (bet) => {
        const game = await this.gameRepository.findOne({
          where: { id: bet.game_id },
        });
        const gameNumbers = bet.numbers;

        if (
          gameNumbers.length > game.max_number ||
          gameNumbers.length < game.max_number
        ) {
          throw new Error(
            `The game does not have the required number of ${game.max_number} of numbers of ${game.type}`,
          );
        }

        gameNumbers.forEach((number) => {
          if (number > game.range) {
            throw new Error(
              `The number ${number} is greater than the allowed range of ${game.range} for the game ${game.type}`,
            );
          }
        });

        betsToSave.push({
          numbers: gameNumbers.join(','),
          user_id: '1',
          game_id: game.id,
          price: game.price,
        });

        return game.price;
      });

      const totalPrices = await Promise.all(totalBets);

      const total = totalPrices.reduce(
        (previousPrice, currentPrice) => previousPrice + currentPrice,
        0,
      );

      const cart = await this.cartRepository.findOne({ where: { id: '1' } });

      if (total < cart.min_cart_value) {
        throw new Error(
          `Minimum bet amount of ${cart.min_cart_value} has not been reached`,
        );
      }

      const bets = await this.betRepository.create(betsToSave);

      const betsSaved = await this.betRepository.save(bets);

      return betsSaved;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async updateBet(id: string, data: UpdateBetInput): Promise<Bet> {
    const bet = await this.betRepository.findOne({ where: { id } });

    try {
      const game = await this.gameRepository.findOne({
        where: { id: data.bet.game_id },
      });

      const gameNumbers = data.bet.numbers;

      const total = game.price;

      if (
        gameNumbers.length > game.max_number ||
        gameNumbers.length < game.max_number
      ) {
        throw new Error(
          `The game does not have the required number of ${game.max_number} of numbers of ${game.type}`,
        );
      }

      gameNumbers.forEach((number) => {
        if (number > game.range) {
          throw new Error(
            `The number ${number} is greater than the allowed range of ${game.range} for the game ${game.type}`,
          );
        }
      });

      const betToSave: IBet = {
        numbers: gameNumbers.join(','),
        user_id: '1',
        game_id: game.id,
        price: game.price,
      };

      const cart = await this.cartRepository.findOne({ where: { id: '1' } });

      if (total < cart.min_cart_value) {
        throw new Error(
          `Minimum bet amount of ${cart.min_cart_value} has not been reached`,
        );
      }

      const bets = await this.betRepository.update({ ...bet }, betToSave);

      const betUpdated = await this.betRepository.save({ ...bet, ...bets });

      return betUpdated;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async deleteBet(id: string): Promise<boolean> {
    await this.findBetById(id);

    const betDeleted = await this.betRepository.delete(id);

    if (betDeleted.affected) {
      return true;
    }

    return false;
  }
}
