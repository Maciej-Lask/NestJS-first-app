import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  productId: string;
  
}
