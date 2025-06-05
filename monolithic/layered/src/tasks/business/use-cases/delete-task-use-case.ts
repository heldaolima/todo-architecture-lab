import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(id: number) {
    const task = await this.repo.findById(id);
    if (!task) {
      return false;
    }

    await this.repo.delete(id);
    return true;
  }
}
