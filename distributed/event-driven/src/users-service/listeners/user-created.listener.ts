import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsTypes } from 'src/events/events-types';
import { UserCreatedEvent } from 'src/events/user-created';

@Controller()
export class UserCreatedEventListener {
  @EventPattern(EventsTypes.UserCreated)
  handle(event: UserCreatedEvent) {
    console.log(`User created: ${event.email}`);
  }
}
