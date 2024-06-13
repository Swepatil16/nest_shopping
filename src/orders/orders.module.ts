import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './orders.entity'; 
import { UsersModule } from '../users/users.module'; 
import { ProductsModule } from '../products/products.module'; 
import { Products } from '../products/products.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Orders,Products]), 
    UsersModule, 
    ProductsModule, 
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
