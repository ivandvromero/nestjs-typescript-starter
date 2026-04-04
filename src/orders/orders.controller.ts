import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  async createOrder(@Body() data: CreateOrderDto) {
    try {
      const result = await this.ordersService.processOrder(data);
      return result;
    } catch (error) {
      throw new BadRequestException(
        error?.message || 'Error al procesar la orden',
      );
    }
  }
}
