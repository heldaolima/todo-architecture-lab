import { Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from 'src/tasks-service/persistence/task-repository';
import { CreateTaskDTO } from 'src/tasks-service/presentation/dtos/create-task-dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
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
    return [task, null];
  }
}
