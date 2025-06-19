import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UserCreatedEventListener],
  exports: [UserCreatedEventListener],
  imports: [DatabaseModule],
})
export class EventListenersModule {}
