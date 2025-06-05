import { TaskRepository } from 'src/tasks/persistence/task-repository';
import { UpdateTaskDTO } from 'src/tasks/presentation/dtos/update-task-dto';
import { Injectable, Inject } from '@nestjs/common';

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
