import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class OrdersService {
  private readonly transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user: 'test', pass: 'test' },
    });
  }
  async processOrder(orderData: CreateOrderDto) {
    console.log('Procesando orden...');

    let total = 0;
    for (const item of orderData.items) {
      total += item.price * item.quantity;
    }
    const totalWithTax = total * 1.19;

    const savedOrder = {
      id: Math.floor(Math.random() * 1000),
      ...orderData,
      total: totalWithTax,
    };

    try {
      await this.sendConfirmationEmail(orderData.email, totalWithTax);
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
    }

    return savedOrder;
  }

  private async sendConfirmationEmail(
    email: string,
    total: number,
  ): Promise<any> {
    return await this.transporter.sendMail({
      from: '"Store" <noreply@store.com>',
      to: email,
      subject: 'Pedido Confirmado',
      text: `Tu total es ${total}`,
    });
  }
}
