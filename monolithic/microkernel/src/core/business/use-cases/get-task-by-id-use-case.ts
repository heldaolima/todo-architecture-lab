import { PluginRegistry } from 'src/core/registry/plugin-registry';
import { TaskRepository } from '../../persistence/task-repository';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PasswordEncryptionPlugin } from 'src/plugins/password-encryption/password-encryption.interface';
import { PluginsTypes } from 'src/plugins/plugins-types';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly repo: TaskRepository,
    private readonly registry: PluginRegistry,
  ) {}

  async execute(id: number, password?: string) {
    let task = await this.repo.findById(id);
    if (task && password) {
      try {
        task = this.registry
          .getPlugin<PasswordEncryptionPlugin>(PluginsTypes.PasswordEncryption)
          .decrypt(task, password);
      } catch {
        throw new UnauthorizedException();
      }
    }
    return task;
  }
}
