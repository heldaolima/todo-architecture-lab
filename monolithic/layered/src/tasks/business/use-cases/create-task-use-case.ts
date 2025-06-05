import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/tasks/domain/entities/task.entity';
import { TaskRepository } from 'src/tasks/persistence/task-repository';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(title: string, description?: string) {
    if (!title) {
      return [null, 'Task title should be informed.'];
    }

    if (title.length < 3 || title.length > 50) {
      return [null, 'Task title should have between 3 and 50 chars'];
    }

    if (!description) {
      description = '';
    }

    const count = await this.repo.count();

    const task = new Task(
      count + 1,
      title,
      description,
      false,
      new Date(),
      new Date(),
    );

    await this.repo.save(task);
    return [task, null];
  }
}
