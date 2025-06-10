import { Injectable, Inject } from '@nestjs/common';
import { TaskRepository } from 'src/core/persistence/task-repository';
import { UpdateTaskDTO } from 'src/core/presentation/dtos/update-task-dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(id: number, body: UpdateTaskDTO) {
    const task = await this.repo.findById(id);
    if (!task) {
      return null;
    }

    if (body.title) {
      task.title = body.title;
    }

    if (body.description) {
      task.description = body.description;
    }

    task.updatedAt = new Date();
    await this.repo.update(task);
    return task;
  }
}
