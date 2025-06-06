import { Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { Operation } from '../operations/operation';
import { Pipeline } from './pipeline';
import { GetTaskById } from '../operations/get-task';
import { SetTaskAsCompleted } from '../operations/set-task-as-completed';
import { PersistUpdatedTask } from '../operations/persist-update-task';

@Injectable()
export class SetTaskAsCompletedPipeline implements Operation<number, Task> {
  private readonly pipeline: Operation<number, Task>;
  constructor(
    private readonly getTaskById: GetTaskById,
    private readonly setTaskAsCopleted: SetTaskAsCompleted,
    private readonly persistUpdatedTask: PersistUpdatedTask,
  ) {
    this.pipeline = new Pipeline([
      this.getTaskById,
      this.setTaskAsCopleted,
      this.persistUpdatedTask,
    ]);
  }

  async execute(input: number) {
    return this.pipeline.execute(input);
  }
}
