import { Controller, Inject } from '@nestjs/common';
import { UserCreatedEvent } from 'src/events/user-created';
import { TaskRepository } from '../persistence/task-repository';
import { EventPattern } from '@nestjs/microservices';
import { EventsTypes } from 'src/events/events-types';

@Controller()
export class UserCreatedEventListener {
  constructor(@Inject('TASK_REPOSITORY') private taskRepo: TaskRepository) {}

  @EventPattern(EventsTypes.UserCreated)
  async handle(event: UserCreatedEvent) {
    await this.taskRepo.save({
      title: 'Example Task',
      description: 'This is a sample task to get you going.',
      userId: event.id,
    });
  }
}
