import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  public getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  public getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}
