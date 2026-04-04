import { ArrayMinSize, IsArray, IsEmail, IsNumber } from 'class-validator';

export class ItemOrderDto {
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsEmail()
  email: string;
  @IsArray()
  @ArrayMinSize(1)
  items: ItemOrderDto[];
}
