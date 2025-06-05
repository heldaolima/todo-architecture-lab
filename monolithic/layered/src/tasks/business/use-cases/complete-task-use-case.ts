import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CompleteTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  public async execute(id: number) {
    const task = await this.repo.findById(id);
    if (task) {
      task.completed = true;
      task.updatedAt = new Date();
      await this.repo.save(task);
    }
    return task;
  }
}
