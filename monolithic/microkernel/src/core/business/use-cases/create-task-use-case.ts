import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/core/domain/entities/task.entity';
import { TaskRepository } from 'src/core/persistence/task-repository';
import { PluginRegistry } from 'src/core/registry/plugin-registry';
import { PluginsTypes } from 'src/core/registry/plugins-types';
import { TaskNotificationPlugin } from 'src/plugins/notifications/notification.interface';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private readonly pluginRegistry: PluginRegistry,
  ) {}

  async execute(title: string, description?: string) {
    if (!title) {
      return [null, 'Task title should be informed.'];
    }

    if (title.length < 3 || title.length > 50) {
      return [null, 'Task title should have between 3 and 50 chars'];
    }

    if (!description) {
      description = '';
    }

    const count = await this.repo.count();

    const task = new Task(
      count + 1,
      title,
      description,
      false,
      new Date(),
      new Date(),
    );

    await this.repo.save(task);

    // notification plugin call
    const notificationPlugins =
      this.pluginRegistry.getPlugins<TaskNotificationPlugin>(
        PluginsTypes.Notifications,
      );
    notificationPlugins.forEach((plugin) => plugin.onTaskCreated(task));

    return [task, null];
  }
}
