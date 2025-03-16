import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  async createOrder(createOrderDto: CreateOrderDto, token: string) {
    // get user information

    // get product infomation
    // calculate total price

    // verify price

    // create Order

    // try to pay

    // update order status

    // return result
  }
}
