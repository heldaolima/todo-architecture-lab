import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { EventListenersModule } from './listeners/listeners.module';

@Module({
  imports: [BusinessModule, EventListenersModule],
  exports: [BusinessModule, EventListenersModule],
})
export class TasksModule {}
