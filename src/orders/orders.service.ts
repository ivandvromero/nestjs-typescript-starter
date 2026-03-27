import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer'); 

@Injectable()
export class OrdersService {
  
  async processOrder(orderData: any) {
    console.log("Procesando orden...");

    let total = 0;
    for (const item of orderData.items) {
      total += item.price * item.quantity;
    }
    const totalWithTax = total * 1.19; 

    const savedOrder = { 
      id: Math.floor(Math.random() * 1000), 
      ...orderData, 
      total: totalWithTax 
    };

    const transporter = nodemailer.createTransport({ 
        host: "smtp.ethereal.email", 
        port: 587, 
        auth: { user: 'test', pass: 'test' } 
    });

    await transporter.sendMail({
      from: '"Store" <noreply@store.com>',
      to: orderData.email,
      subject: "Pedido Confirmado",
      text: `Tu total es ${totalWithTax}`,
    });

    return savedOrder;
  }
}
