import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';

@Module({
    imports: [ApplicationModule],
    exports: [ApplicationModule],
})
export class UsersServiceModule {}
