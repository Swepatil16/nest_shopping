import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.entity'
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Products> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Products> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: number): Promise<void> {
    return this.productsService.removeProduct(id);
  }
}
