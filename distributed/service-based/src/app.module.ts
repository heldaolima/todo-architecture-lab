import { Module } from '@nestjs/common';
import { TasksModule } from './tasks-service/tasks.module';
import { UsersServiceModule } from './users-service/users-service.module';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

@Module({
  imports: [
    // TasksModule, 
    // UsersServiceModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    ApiGatewayModule
  ],
})
export class AppModule {}
