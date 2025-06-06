import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { Operation } from './operation';
import { TaskRepository } from '../persistence/task-repository';

@Injectable()
export class PersistTask implements Operation<Task, Task> {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(task: Task): Promise<Task> {
    await this.repo.save(task);
    return task;
  }
}
