import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserCreatedEventListener],
  imports: [DatabaseModule],
})
export class EventListenersModule {}
