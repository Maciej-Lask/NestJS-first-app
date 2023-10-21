import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  productId: string;

}
