import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GetAllTasksUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute() {
    return this.repo.findAll();
  }
}
