import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';

@Module({
  providers: [UserCreatedEventListener],
  exports: [UserCreatedEventListener],
})
export class EventListenersModule {}
