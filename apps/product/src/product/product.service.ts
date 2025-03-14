import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async createSampels() {
    const data = [
      {
        name: 'プリン',
        price: 300,
        description: '美味しいジャージープリン',
        stock: 3,
      },
      {
        name: 'ラーメン',
        price: 150,
        description: '美味しくて辛いラーメン',
        stock: 1,
      },
      {
        name: 'ケーキ',
        price: 500,
        description: 'ふわふわで甘いショートケーキ',
        stock: 2,
      },
      {
        name: 'おにぎり',
        price: 200,
        description: '具材たっぷりの美味しいおにぎり',
        stock: 5,
      },
      {
        name: 'カレー',
        price: 700,
        description: 'スパイシーでコクのあるカレー',
        stock: 4,
      },
      {
        name: '寿司',
        price: 1200,
        description: '新鮮なネタを使った美味しい寿司',
        stock: 3,
      }
    ]
    await this.productRepository.save(data);
    return true;
  }
}
