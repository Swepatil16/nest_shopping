// src/orders/orders.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Orders } from './orders.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Orders> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Orders[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Orders> {
    return this.ordersService.findOneOrder(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Orders> {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async removeOrder(@Param('id') id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
