import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';
import { DatabaseModule } from '../database/database.module';
import { TaskCreatedListener } from './task-created.listener';
import { TaskCompletedListener } from './task-completed.listener';
import { LoginListener } from './login.listener';

@Module({
  controllers: [
    UserCreatedEventListener,
    TaskCreatedListener,
    TaskCompletedListener,
    LoginListener,
  ],
  imports: [DatabaseModule],
})
export class EventListenersModule {}
