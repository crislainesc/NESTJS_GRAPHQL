import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Resolver()
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [Cart])
  async carts(): Promise<Cart[]> {
    const carts = await this.cartService.findAllCarts();
    return carts;
  }

  @Query(() => Cart)
  async cart(@Args('id') id: string): Promise<Cart> {
    const cart = await this.cartService.findCartById(id);
    return cart;
  }

  @Mutation(() => Cart)
  async createCart(@Args('data') data: CreateCartInput): Promise<Cart> {
    const cart = await this.cartService.createCart(data);
    return cart;
  }

  @Mutation(() => Cart)
  async updateCart(
    @Args('id') id: string,
    @Args('data') data: UpdateCartInput,
  ): Promise<Cart> {
    const cartUpdated = await this.cartService.updateCart(id, data);
    return cartUpdated;
  }

  @Mutation(() => Boolean)
  async deleteCart(@Args('id') id: string): Promise<boolean> {
    const cartDeleted = await this.cartService.deleteCart(id);
    return cartDeleted;
  }
}
