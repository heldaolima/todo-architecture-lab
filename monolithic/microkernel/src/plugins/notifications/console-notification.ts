import { Task } from 'src/core/domain/entities/task.entity';
import { TaskNotificationPlugin } from './notification.interface';
import { IPlugin } from '../plugin.interface';
import { PluginsTypes } from '../plugins-types';

export class TaskConsoleNotificationPlugin implements TaskNotificationPlugin, IPlugin {
  public readonly type = PluginsTypes.Notifications;

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
