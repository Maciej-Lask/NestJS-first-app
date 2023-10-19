import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  public async getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  public async getOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Delete('/:id')
  public async deleteOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.ordersService.deleteOrderById(id);
    return { success: true };
  }

  @Post('/')
  async create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }
  @Put('/:id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    const order = await this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.ordersService.updateById(id, orderData);
  }
}
