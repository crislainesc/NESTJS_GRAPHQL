import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async findAllCarts(): Promise<Cart[]> {
    const carts = await this.cartRepository.find();
    return carts;
  }

  async findCartById(id: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async createCart(data: CreateCartInput): Promise<Cart> {
    const cart = this.cartRepository.create(data);
    const cartSaved = await this.cartRepository.save(cart);

    if (!cartSaved) {
      throw new InternalServerErrorException('Problem for create a new cart');
    }

    return cartSaved;
  }

  async updateCart(id: string, data: UpdateCartInput): Promise<Cart> {
    const cart = await this.findCartById(id);

    this.cartRepository.update({ ...cart }, { ...data });

    const cartUpdated = this.cartRepository.save({ ...cart, ...data });

    return cartUpdated;
  }

  async deleteCart(id: string): Promise<boolean> {
    await this.findCartById(id);

    const cartDeleted = await this.cartRepository.delete(id);

    if (cartDeleted.affected) {
      return true;
    }

    return false;
  }
}
