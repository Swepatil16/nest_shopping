import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.entity';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { Products } from './products/products.entity';
import { Orders } from './orders/orders.entity';


dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [Users, Products, Orders],
        synchronize: true, // Use 'false' in production
      }
    ),
    UsersModule,
    OrdersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

 }