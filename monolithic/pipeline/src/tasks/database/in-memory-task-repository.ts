import { Task } from '../domain/entities/task.entity';
import { TaskRepository } from '../persistence/task-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private taskCount: number = 0;

  save(task: Task) {
    this.tasks.push(task);
    this.taskCount++;
    return Promise.resolve();
  }

  public findAll() {
    return Promise.resolve(this.tasks);
  }

  public findById(id: number) {
    const task = this.tasks.find((t) => t.id === id) || null;
    return Promise.resolve(task);
  }

  public delete(id: number) {
    const filteredTasks = this.tasks.filter((t) => t.id !== id);
    this.tasks = filteredTasks;
    this.taskCount--;
    return Promise.resolve();
  }

  public update(task: Task) {
    const idx = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks[idx] = task;
    return Promise.resolve();
  }

  public count() {
    return Promise.resolve(this.taskCount);
  }
}
