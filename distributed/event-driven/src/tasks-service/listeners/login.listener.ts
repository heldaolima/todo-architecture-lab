import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsTypes } from 'src/events/events-types';
import { LoginEvent } from 'src/events/login';

@Controller()
export class LoginListener {
  @EventPattern(EventsTypes.Login)
  handle(event: LoginEvent) {
    console.log('Tasks listener for login event: ', event);
  }
}
