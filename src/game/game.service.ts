import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  async findAllGames(): Promise<Game[]> {
    const games = await this.gameRepository.find();
    return games;
  }

  async findGameById(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async createGame(data: CreateGameInput): Promise<Game> {
    const game = this.gameRepository.create(data);
    const gameSaved = await this.gameRepository.save(game);

    if (!gameSaved) {
      throw new InternalServerErrorException('Problem for create a new game');
    }

    return gameSaved;
  }

  async updateGame(id: string, data: UpdateGameInput): Promise<Game> {
    const game = await this.findGameById(id);

    this.gameRepository.update({ ...game }, { ...data });

    const gameUpdated = this.gameRepository.save({ ...game, ...data });

    return gameUpdated;
  }

  async deleteGame(id: string): Promise<boolean> {
    await this.findGameById(id);

    const gameDeleted = await this.gameRepository.delete(id);

    if (gameDeleted.affected) {
      return true;
    }

    return false;
  }
}
