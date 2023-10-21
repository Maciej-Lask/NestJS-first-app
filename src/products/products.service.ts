import { Injectable } from '@nestjs/common';
// import { db, Product } from './../db';
import { Product } from '@prisma/client';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from './../shared/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  // public getAll(): Product[] {
  //   return db.products;
  // }
  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }
  // public getProductById(id: Product['id']): Product | null {
  //   return db.products.find((product) => product.id === id);
  // }

  public getProductById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  public getExtendedById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }
  // public deleteProductById(id: Product['id']): void {
  //   db.products = db.products.filter((product) => product.id !== id);
  // }
  public deleteProductById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
  // public create(productData: Omit<Product, 'id'>): Product {
  //   const newProduct = { ...productData, id: uuidv4() };
  //   db.products.push(newProduct);
  //   return newProduct;
  // }

  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  // public updateById(id: Product['id'], productData: Omit<Product, 'id'>): void {
  //   db.products = db.products.map((product) => {
  //     if (product.id === id) {
  //       return { ...product, ...productData };
  //     }
  //     return product;
  //   });
  // }

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }
}
