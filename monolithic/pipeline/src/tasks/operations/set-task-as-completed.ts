import { Injectable } from '@nestjs/common';
import { Task } from '../domain/entities/task.entity';
import { Operation } from './operation';

@Injectable()
export class SetTaskAsCompleted implements Operation<Task, Task> {
  execute(input: Task) {
    input.completed = true;
    return Promise.resolve(input);
  }
}
