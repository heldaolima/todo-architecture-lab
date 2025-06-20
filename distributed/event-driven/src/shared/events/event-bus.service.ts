import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class EventBusService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'events_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async publish<T>(pattern: string, data: T) {
    await this.client.emit(pattern, data).toPromise();
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
