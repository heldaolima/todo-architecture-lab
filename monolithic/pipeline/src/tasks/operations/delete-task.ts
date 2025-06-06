import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { TaskRepository } from '../persistence/task-repository';
import { Operation } from './operation';

@Injectable()
export class DeleteTask implements Operation<Task, void> {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(task: Task) {
    await this.repo.delete(task.id);
  }
}
