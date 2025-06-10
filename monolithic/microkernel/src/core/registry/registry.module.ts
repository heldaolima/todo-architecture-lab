import { Module, OnModuleInit } from "@nestjs/common";
import { PluginRegistry } from "./plugin-registry";
import { PluginsModule } from "src/plugins/plugins.module";
import { TaskConsoleNotificationPlugin } from "src/plugins/notifications/console-notification";
import { PluginsTypes } from "./plugins-types";

@Module({
    providers: [PluginRegistry],
    exports: [PluginRegistry],
    imports: [PluginsModule]
})
export class RegistryModule implements OnModuleInit {
    constructor(
        private readonly notificationPlugin: TaskConsoleNotificationPlugin,
        private readonly registry: PluginRegistry,
    ) {}
    onModuleInit() {
        this.registry.registerPlugin(PluginsTypes.Notifications, this.notificationPlugin);
    }
}