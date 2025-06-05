import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(id: number) {
    const task = await this.repo.findById(id);
    return task;
  }
}
