import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/core/domain/entities/task.entity';
import { TaskRepository } from 'src/core/persistence/task-repository';
import { CreateTaskDTO } from 'src/core/presentation/dtos/create-task-dto';
import { PluginRegistry } from 'src/core/registry/plugin-registry';
import { PluginsTypes } from 'src/plugins/plugins-types';
import { TaskNotificationPlugin } from 'src/plugins/notifications/notification.interface';
import { PasswordEncryptionPlugin } from 'src/plugins/password-encryption/password-encryption.interface';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private readonly pluginRegistry: PluginRegistry,
  ) {}

  async execute(dto: CreateTaskDTO) {
    let { title, description, password } = dto;

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

    let task = new Task(
      count + 1,
      title,
      description,
      false,
      new Date(),
      new Date(),
    );

    task = this.executePlugins(task, password);

    await this.repo.save(task);

    return [task, null];
  }

  private executePlugins(task: Task, password?: string) {
    const notificationPlugin =
      this.pluginRegistry.getPlugin<TaskNotificationPlugin>(
        PluginsTypes.Notifications,
      );
    notificationPlugin.onTaskCreated(task);

    if (password) {
      const passwordPlugin =
        this.pluginRegistry.getPlugin<PasswordEncryptionPlugin>(
          PluginsTypes.PasswordEncryption,
        );

      task = passwordPlugin.encrypt(task, password);
    }
    return task;
  }
}
