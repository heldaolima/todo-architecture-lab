import { TaskCompleted } from 'src/events/task-completed';
import { TaskRepository } from '../../persistence/task-repository';
import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { EventBusService } from 'src/shared/events/event-bus.service';
import { EventsTypes } from 'src/events/events-types';

@Injectable()
export class CompleteTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private eventBus: EventBusService,
  ) {}

  public async execute(id: number, userId: number) {
    const task = await this.repo.findById(id);
    if (!task) {
      throw new NotFoundException();
    }

    if (task.userId !== userId) {
      throw new ForbiddenException();
    }

    const updatedTask = await this.repo.update(task.id, { completed: true });

    const event = new TaskCompleted(
      updatedTask.id,
      updatedTask.title,
      updatedTask.userId,
      new Date(),
    );
    await this.eventBus.publish(EventsTypes.TaskCompleted, event);

    return updatedTask;
  }
}
