import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { CreateTaskDTO } from '../presentation/dtos/create-task-dto';
import { TaskRepository } from '../persistence/task-repository';
import { Operation } from './operation';

@Injectable()
export class TransformToTaskEntity implements Operation<CreateTaskDTO, Task> {
  constructor(
    @Inject('TASK_REPOSITORY')
    private repo: TaskRepository,
  ) { }

  async execute(input: CreateTaskDTO): Promise<Task> {
    const count = await this.repo.count();

    const task = new Task(
      count + 1,
      input.title,
      input.description || '',
      false,
      new Date(),
      new Date(),
    );

    return task;
  }
}
