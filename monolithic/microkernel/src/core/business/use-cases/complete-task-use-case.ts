import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject } from '@nestjs/common';
import { PluginRegistry } from 'src/core/registry/plugin-registry';
import { PluginsTypes } from 'src/plugins/plugins-types';
import { TaskNotificationPlugin } from 'src/plugins/notifications/notification.interface';

@Injectable()
export class CompleteTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private readonly registry: PluginRegistry,
  ) {}

  public async execute(id: number) {
    const task = await this.repo.findById(id);
    if (task) {
      task.completed = true;
      task.updatedAt = new Date();
      await this.repo.save(task);

      const notficationPlugins =
        this.registry.getPlugin<TaskNotificationPlugin>(
          PluginsTypes.Notifications,
        );
      notficationPlugins.onTaskCompleted(task);
    }

    return task;
  }
}
