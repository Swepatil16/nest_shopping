// orders.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../orders/orders.entity';
import { Products } from '../products/products.entity';
import { Users } from '../users/users.entity';
import { CreateOrderDto  } from './dtos/create-order.dto';
import { UpdateOrderDto  } from './dtos/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Products) // Ensure correct injection of ProductsRepository
    private readonly productsRepository: Repository<Products>,
  ) {}

  
  async findAll(): Promise<Orders[]> {
    return this.orderRepository.find({
      relations: ['products', 'user'], 
    });
  }

  

  async createOrder(createOrderDto: CreateOrderDto): Promise<Orders> {
    const { products, userId } = createOrderDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    

    const order = new Orders();
    order.products = await this.productsRepository.findByIds(products);
    order.user = user;
    order.totalPrice = order.products.reduce((total, product) => total + product.price, 0);

    return this.orderRepository.save(order);
  }

  async findOneOrder(id: number): Promise<Orders> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.products = await this.productsRepository.findByIds(updateOrderDto.products.map(product => product.id));
    order.totalPrice = order.products.reduce((total, product) => total + product.price, 0);

    return this.orderRepository.save(order);
  }

  async deleteOrder(id: number): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.remove(order);
  }
}
