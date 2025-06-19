import { Task } from '../domain/entities/task.entity';
import { SaveTask, TaskRepository, UpdateTask } from '../persistence/task-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private taskCount: number = 0;

  save(dto: SaveTask) {
    const task = new Task(
      this.taskCount+1,
      dto.title,
      dto.description,
      false,
      dto.userId,
      new Date(),
      new Date(),
    );
    this.tasks.push(task);
    return Promise.resolve(task);
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

  public update(id: number, dto: UpdateTask) {
    const idx = this.tasks.findIndex((t) => t.id === id);

    this.tasks[idx].title = dto.title ?? this.tasks[idx].title;
    this.tasks[idx].description = dto.description ?? this.tasks[idx].description;
    this.tasks[idx].completed = dto.completed ?? this.tasks[idx].completed;

    this.tasks[idx].updatedAt = new Date();

    return Promise.resolve(this.tasks[idx]);
  }

  public count() {
    return Promise.resolve(this.taskCount);
  }

  public findAllByUser(userId: number) {
    const tasks = this.tasks.filter((task) => task.userId === userId);
    return Promise.resolve(tasks);
  }
}
