import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EventsTypes } from 'src/events/events-types';
import { TaskCompleted } from 'src/events/task-completed';

@Controller()
export class TaskCompletedListener {
  @EventPattern(EventsTypes.TaskCompleted)
  handle(event: TaskCompleted) {
    console.log('Users listener for task completed: ', event);
  }
}
