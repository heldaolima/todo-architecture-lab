import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) { }

  async execute(id: number, userId: number) {
    const task = await this.repo.findById(id);
    if (!task) {
      throw new NotFoundException();
    }

    if (task.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.repo.delete(id);
  }
}
