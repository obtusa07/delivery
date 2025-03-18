import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from '@app/common';
import { PaymentCancelledException } from './exception/payment-cancelled.exception';

@Injectable()
export class OrderService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: ClientProxy
  ) { }

  async createOrder(createOrderDto: CreateOrderDto, token: string) {
    // get user information
    const user = await this.getUserFromToken(token);
    // get product infomation
    console.log(user)

    // calculate total price

    // verify price

    // create Order

    // try to pay

    // update order status

    // return result
  }

  async getUserFromToken(token: string) {
    // verify token
    const response = await lastValueFrom(this.userService.send({ cmd: 'parse_bearer_token' }, { token }))
    if (response.status === 'error') {
      throw new PaymentCancelledException(response);
    }

    const userId = response.data.sub;
    const userResponse = await lastValueFrom(this.userService.send({ cmd: 'get_user_info' }, { userId }));
    if (userResponse.status === 'error') {
      throw new PaymentCancelledException(userResponse);
    }

    return userResponse.data;
  }
}
