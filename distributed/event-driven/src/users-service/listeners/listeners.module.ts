import { Module } from '@nestjs/common';
import { UserCreatedEventListener } from './user-created.listener';
import { TaskCompletedListener } from './task-completed.listener';
import { LoginListener } from './login.listener';
import { TaskCreatedListener } from './task-created.listener';

@Module({
  controllers: [
    UserCreatedEventListener,
    TaskCreatedListener,
    TaskCompletedListener,
    LoginListener,
  ],
})
export class EventListenersModule {}
