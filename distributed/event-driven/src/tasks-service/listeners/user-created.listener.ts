import { Controller, Inject, Logger } from '@nestjs/common';
import { UserCreatedEvent } from 'src/events/user-created';
import { TaskRepository } from '../persistence/task-repository';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class UserCreatedEventListener {
  private readonly logger = new Logger(UserCreatedEventListener.name);

  constructor(@Inject('TASK_REPOSITORY') private taskRepo: TaskRepository) {}

  @EventPattern('user.created')
  async handle(event: UserCreatedEvent) {
    this.logger.log(`Processing user created event for user ${event.id}`);
    await this.taskRepo.save({
      title: 'Example Task',
      description: 'This is a sample task to get you going.',
      userId: event.id,
    });
  }
}
