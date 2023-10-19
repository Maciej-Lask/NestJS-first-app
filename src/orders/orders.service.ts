import { Injectable } from '@nestjs/common';
// import { db, Order } from '../db';
import { Order } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getOrderById(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public deleteOrderById(id: string): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public create(orderData: Omit<Order, 'id'|'createdAt'|'updatedAt'>): Promise<Order> {
    return this.prismaService.order.create({
      data: orderData,
    });
  }

  public updateById(id: string, orderData: Omit<Order, 'id'|'createdAt'|'updatedAt'>): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: orderData,
    });
  }
}
