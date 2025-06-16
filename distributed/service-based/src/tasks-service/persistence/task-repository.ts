import { Task } from '../domain/entities/task.entity';

export interface SaveTask {
  title: string;
  description: string;
  userId: number;
}

export interface UpdateTask {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TaskRepository {
  save: (dto: SaveTask) => Promise<Task>;
  findById: (id: number) => Promise<Task | null>;
  findAll: () => Promise<Array<Task>>;
  delete: (id: number) => Promise<void>;
  count: () => Promise<number>;
  update: (id: number, dto: UpdateTask) => Promise<Task>;
  findAllByUser: (userId: number) => Promise<Task[]>;
}
