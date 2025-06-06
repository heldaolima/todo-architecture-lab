import { Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { UpdateTaskDTO } from '../presentation/dtos/update-task-dto';
import { Operation } from './operation';

type UpdateTaskInput = {
  dto: UpdateTaskDTO;
  task: Task;
};

@Injectable()
export class MergeUpdatedTaskFields
  implements Operation<UpdateTaskInput, Task> {
  execute(input: UpdateTaskInput) {
    input.task.title = input.dto.title ?? input.task.title;
    input.task.description = input.dto.description ?? input.task.description;

    input.task.updatedAt = new Date();
    return Promise.resolve(input.task);
  }
}
