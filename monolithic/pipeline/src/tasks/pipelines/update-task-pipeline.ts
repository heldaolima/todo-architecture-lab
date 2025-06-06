import { Inject, Injectable } from '@nestjs/common';
import { DeleteTask } from '../operations/delete-task';
import { GetTaskById } from '../operations/get-task';
import { Operation } from '../operations/operation';
import { TaskRepository } from '../persistence/task-repository';
import { Pipeline } from './pipeline';
import { Task } from '../domain/entities/task.entity';
import { UpdateTaskDTO } from '../presentation/dtos/update-task-dto';
import { ValidateUpdateTaskFields } from '../operations/validate-update-task-fields';
import { MergeUpdatedTaskFields } from '../operations/merge-updated-task-fields';
import { PersistUpdatedTask } from '../operations/persist-update-task';

type UpdateTaskPipelineInput = {
  dto: UpdateTaskDTO;
  id: number;
};

@Injectable()
export class UpdateTaskPipeline
  implements Operation<UpdateTaskPipelineInput, Task> {
  private readonly pipeline: Operation<UpdateTaskPipelineInput, void>;
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
  ) {
    this.pipeline = new Pipeline([new GetTaskById(repo), new DeleteTask(repo)]);
  }

  // fail
  async execute(input: UpdateTaskPipelineInput) {
    let task = await new GetTaskById(this.repo).execute(input.id);
    const dto = await new ValidateUpdateTaskFields().execute(input.dto);
    task = await new MergeUpdatedTaskFields().execute({ task, dto });
    task = await new PersistUpdatedTask(this.repo).execute(task);
    return task;
  }
}
