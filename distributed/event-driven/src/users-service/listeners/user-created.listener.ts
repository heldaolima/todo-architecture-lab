import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserCreatedEvent } from 'src/events/user-created';

@Controller()
export class UserCreatedEventListener {
  @EventPattern('user.created')
  handle(event: UserCreatedEvent) {
    console.log(`User created: ${event.email}`);
  }
}
