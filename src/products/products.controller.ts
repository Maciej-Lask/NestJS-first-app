import { Controller, Delete, Get, Post, Put, Body, Param, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getProductById(id))
      throw new NotFoundException('Product not found');
    return this.productsService.getProductById(id);
  }

  @Delete('/:id')
  public deleteProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getProductById(id))
      throw new NotFoundException('Product not found');
    this.productsService.deleteProductById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
     if (!this.productsService.getProductById(id))
       throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }
  
  
}
