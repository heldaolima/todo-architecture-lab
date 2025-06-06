import { Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { Operation } from '../operations/operation';
import { CreateTaskDTO } from '../presentation/dtos/create-task-dto';
import { Pipeline } from './pipeline';
import { ValidateTaskFields } from '../operations/validate-task-fields-op';
import { TransformToTaskEntity } from '../operations/transform-to-task-entity';
import { PersistTask } from '../operations/persist-task';

@Injectable()
export class CreateTaskPipeline implements Operation<CreateTaskDTO, Task> {
  private readonly pipeline: Operation<CreateTaskDTO, Task>;
  constructor(
    private readonly validateTaskFields: ValidateTaskFields,
    private readonly tranformToTaskEntity: TransformToTaskEntity,
    private readonly persistTask: PersistTask,
  ) {
    this.pipeline = new Pipeline([
      this.validateTaskFields,
      this.tranformToTaskEntity,
      this.persistTask,
    ]);
  }

  async execute(input: CreateTaskDTO) {
    return this.pipeline.execute(input);
  }
}
