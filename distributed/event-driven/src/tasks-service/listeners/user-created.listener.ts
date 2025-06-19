import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/events/user-created';
import { TaskRepository } from '../persistence/task-repository';

@Injectable()
export class UserCreatedEventListener {
  constructor(@Inject('TASK_REPOSITORY') private taskRepo: TaskRepository) {}

  @OnEvent('user.created')
  async handle(event: UserCreatedEvent) {
    await this.taskRepo.save({
      title: 'Example Task',
      description: 'This is a sample task to get you going.',
      userId: event.id,
    });
  }
}
