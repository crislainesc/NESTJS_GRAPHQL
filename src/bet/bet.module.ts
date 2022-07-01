import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetResolver } from './bet.resolver';
import { BetService } from './bet.service';
import { Bet } from './bet.entity';
import { Cart } from 'src/cart/cart.entity';
import { Game } from 'src/game/game.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Game]),
  ],
  providers: [BetResolver, BetService],
})
export class BetModule {}
