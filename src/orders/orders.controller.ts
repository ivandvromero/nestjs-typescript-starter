import { Controller, Post, Body, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  async createOrder(@Body() data: any, @Res() res: any) {
    if (!data.email || !data.items || data.items.length === 0) {
      return res.status(400).send("Datos incompletos");
    }

    const result = await this.ordersService.processOrder(data);
    return res.status(201).json(result);
  }
}
