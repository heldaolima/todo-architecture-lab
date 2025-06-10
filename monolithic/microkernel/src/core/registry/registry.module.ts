import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { PluginRegistry } from './plugin-registry';
import { PluginsModule } from 'src/plugins/plugins.module';
import { IPlugin } from 'src/plugins/plugin.interface';

@Module({
  providers: [PluginRegistry],
  exports: [PluginRegistry],
  imports: [PluginsModule],
})
export class RegistryModule implements OnModuleInit {
  constructor(
    private readonly registry: PluginRegistry,
    @Inject('PLUGINS') private readonly plugins: Array<IPlugin>,
  ) {}
  onModuleInit() {
    this.plugins.forEach((plugin) => {
        this.registry.registerPlugin(plugin.type, plugin);
    })
  }
}
