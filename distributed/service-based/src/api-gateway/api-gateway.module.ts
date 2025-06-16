import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TasksController } from './tasks.controller';
import { UserController } from './users.controller';
import { TasksModule } from 'src/tasks-service/tasks.module';
import { UsersServiceModule } from 'src/users-service/users-service.module';

@Module({
  imports: [TasksModule, UsersServiceModule],
  controllers: [AuthController, TasksController, UserController],
})
export class ApiGatewayModule {}
