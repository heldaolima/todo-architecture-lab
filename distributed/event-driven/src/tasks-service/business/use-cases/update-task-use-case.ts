import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { TaskRepository } from 'src/tasks-service/persistence/task-repository';
import { UpdateTaskDTO } from 'src/tasks-service/presentation/dtos/update-task-dto';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(id: number, body: UpdateTaskDTO, userId: number) {
    let task = await this.repo.findById(id);
    if (!task) {
      return null;
    }

    if (task.userId !== userId) {
      throw new ForbiddenException();
    }

    task = await this.repo.update(id, body);
    return task;
  }
}
