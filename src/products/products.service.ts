// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Products[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Products> {
    return this.productRepository.findOneBy({ id });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Products> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async removeProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
