import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { Operation } from './operation';
import { TaskRepository } from '../persistence/task-repository';

@Injectable()
export class GetAllTasks implements Operation<undefined, Task[]> {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  execute() {
    return this.repo.findAll();
  }
}
