import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';

@Module({
  controllers: [UserCreatedEventListener],
})
export class EventListenersModule {}
