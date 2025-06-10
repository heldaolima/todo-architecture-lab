import { Module } from '@nestjs/common';
import { TaskConsoleNotificationPlugin } from './notifications/console-notification';

@Module({
    providers: [TaskConsoleNotificationPlugin],
    exports: [TaskConsoleNotificationPlugin]
})
export class PluginsModule {}
