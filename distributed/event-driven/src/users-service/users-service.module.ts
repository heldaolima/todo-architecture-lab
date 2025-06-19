import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { EventListenersModule } from 'src/tasks-service/listeners/listeners.module';

@Module({
  imports: [ApplicationModule, EventListenersModule],
  exports: [ApplicationModule, EventListenersModule],
})
export class UsersServiceModule {}
