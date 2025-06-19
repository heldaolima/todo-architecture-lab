import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/events/user-created';

@Injectable()
export class UserCreatedEventListener {
  @OnEvent('user.created')
  handle(event: UserCreatedEvent) {
    console.log(`User created: ${event.email}`);
  }
}
