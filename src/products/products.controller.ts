import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  public deleteProductById(@Param('id') id: string) {
    this.productsService.deleteProductById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
