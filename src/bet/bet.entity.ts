import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from 'src/game/game.entity';
import { User } from 'src/user/user.entity';

@ObjectType()
@Entity()
export class Bet {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @Column()
  numbers: string;

  @Column()
  @ManyToMany(() => User, (User) => User.id, { cascade: true })
  user_id: string;

  @Column()
  @ManyToMany(() => Game, (Game) => Game.id, { cascade: true })
  game_id: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
