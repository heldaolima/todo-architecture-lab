import { Module } from '@nestjs/common';
import { CompleteTaskUseCase } from './use-cases/complete-task-use-case';
import { CreateTaskUseCase } from './use-cases/create-task-use-case';
import { DeleteTaskUseCase } from './use-cases/delete-task-use-case';
import { GetAllTasksUseCase } from './use-cases/get-all-tasks-use-case';
import { GetTaskByIdUseCase } from './use-cases/get-task-by-id-use-case';
import { UpdateTaskUseCase } from './use-cases/update-task-use-case';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  providers: [
    CompleteTaskUseCase,
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetAllTasksUseCase,
    GetTaskByIdUseCase,
    UpdateTaskUseCase,
  ],
  exports: [
    CompleteTaskUseCase,
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetAllTasksUseCase,
    GetTaskByIdUseCase,
    UpdateTaskUseCase,
  ],
  imports: [
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
      },
    ]),
  ],
})
export class BusinessModule {}

