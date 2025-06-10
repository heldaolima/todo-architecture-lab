import { Task } from 'src/core/domain/entities/task.entity';
import { TaskNotificationPlugin } from './notification.interface';

export class TaskConsoleNotificationPlugin implements TaskNotificationPlugin {
  public onTaskCreated(task: Task) {
    console.log(
      `Task "${task.title}" created at ${task.createdAt.toLocaleDateString()}, ${task.createdAt.toLocaleTimeString()}`,
    );
  }

  public onTaskCompleted(task: Task) {
    console.log(
      `Task "${task.title}" completed at ${task.updatedAt.toLocaleDateString()}, ${task.updatedAt.toLocaleTimeString()}`,
    );
  }
}
