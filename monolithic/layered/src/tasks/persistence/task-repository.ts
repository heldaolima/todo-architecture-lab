import { Task } from '../domain/entities/task.entity';

export interface TaskRepository {
  save: (task: Task) => Promise<void>;
  findById: (id: number) => Promise<Task | null>;
  findAll: () => Promise<Array<Task>>;
  delete: (id: number) => Promise<void>;
  count: () => Promise<number>;
  update: (task: Task) => Promise<void>;
}
