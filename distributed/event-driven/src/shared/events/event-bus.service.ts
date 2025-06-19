import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class EventBusService {
  private readonly logger = new Logger(EventBusService.name);
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

  async publish(pattern: string, data: any) {
    try {
      await this.client.emit(pattern, data).toPromise();
      this.logger.log(`Event published ${pattern}`);
    } catch (error) {
      this.logger.error(`Failed to publish event ${pattern}:`, error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
