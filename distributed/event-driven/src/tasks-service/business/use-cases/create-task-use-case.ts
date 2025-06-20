import { Inject, Injectable } from '@nestjs/common';
import { TaskCreatedEvent } from 'src/events/task-created';
import { EventBusService } from 'src/shared/events/event-bus.service';
import { TaskRepository } from 'src/tasks-service/persistence/task-repository';
import { CreateTaskDTO } from 'src/tasks-service/presentation/dtos/create-task-dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private eventBus: EventBusService,
  ) {}

  async execute(dto: CreateTaskDTO, userId: number) {
    let { title, description } = dto;

    if (!title) {
      return [null, 'Task title should be informed.'];
    }

    if (title.length < 3 || title.length > 50) {
      return [null, 'Task title should have between 3 and 50 chars'];
    }

    if (!description) {
      description = '';
    }

    const task = await this.repo.save({ title, description, userId });

    const event = new TaskCreatedEvent(
      task.id,
      task.title,
      task.userId,
      task.createdAt,
    );
    await this.eventBus.publish('task.created', event);

    return [task, null];
  }
}
