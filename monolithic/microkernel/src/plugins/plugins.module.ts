import { Module } from '@nestjs/common';
import { TaskConsoleNotificationPlugin } from './notifications/console-notification';
import { AESPasswordEncryptionPlugin } from './password-encryption/aes-password-encryption';

@Module({
    providers: [
        {
            provide: 'PLUGINS',
            useFactory: (
                notification: TaskConsoleNotificationPlugin,
                encryption: AESPasswordEncryptionPlugin,
            ) => [notification, encryption],
            inject: [TaskConsoleNotificationPlugin, AESPasswordEncryptionPlugin]
        },
        TaskConsoleNotificationPlugin,
        AESPasswordEncryptionPlugin,
    ],
    exports: ['PLUGINS', TaskConsoleNotificationPlugin, AESPasswordEncryptionPlugin]
})
export class PluginsModule {}
