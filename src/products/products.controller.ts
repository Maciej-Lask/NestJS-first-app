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
  
  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }
  // @Get('/:id')
  // public getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
  //   if (!this.productsService.getProductById(id))
  //     throw new NotFoundException('Product not found');
  //   return this.productsService.getProductById(id);
  // }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getProductById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }


  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  // @Delete('/:id')
  // public deleteProductById(@Param('id', new ParseUUIDPipe()) id: string) {
  //   if (!this.productsService.getProductById(id))
  //     throw new NotFoundException('Product not found');
  //   this.productsService.deleteProductById(id);
  //   return { success: true };
  // }
  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getProductById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteProductById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  // @Put('/:id')
  // updateById(
  //   @Param('id', new ParseUUIDPipe()) id: string,
  //   @Body() productData: UpdateProductDTO,
  // ) {
  //   if (!this.productsService.getProductById(id))
  //     throw new NotFoundException('Product not found');

  //   this.productsService.updateById(id, productData);
  //   return { success: true };
  // }
  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getProductById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }
}
