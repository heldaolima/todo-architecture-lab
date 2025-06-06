import { Inject, Injectable } from '@nestjs/common';
import { DeleteTask } from '../operations/delete-task';
import { GetTaskById } from '../operations/get-task';
import { Operation } from '../operations/operation';
import { TaskRepository } from '../persistence/task-repository';
import { Pipeline } from './pipeline';

@Injectable()
export class DeleteTaskPipeline implements Operation<number, void> {
  private readonly pipeline: Operation<number, void>;
  constructor(
    private readonly getTaskById: GetTaskById,
    private readonly deleteTask: DeleteTask,
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) {
    this.pipeline = new Pipeline([this.getTaskById, this.deleteTask]);
  }

  async execute(input: number) {
    return this.pipeline.execute(input);
  }
}
