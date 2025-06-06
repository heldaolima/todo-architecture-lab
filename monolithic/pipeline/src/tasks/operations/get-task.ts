import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Operation } from './operation';
import { TaskRepository } from '../persistence/task-repository';
import { Task } from '../domain/entities/task.entity';

@Injectable()
export class GetTaskById implements Operation<number, Task> {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(input: number) {
    const task = await this.repo.findById(input);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
