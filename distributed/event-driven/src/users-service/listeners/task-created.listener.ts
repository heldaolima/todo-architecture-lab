import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsTypes } from 'src/events/events-types';
import { TaskCreatedEvent } from 'src/events/task-created';

@Controller()
export class TaskCreatedListener {
  @EventPattern(EventsTypes.TaskCreated)
  handle(event: TaskCreatedEvent) {
    console.log('Users listener for task created:', event);
  }
}
