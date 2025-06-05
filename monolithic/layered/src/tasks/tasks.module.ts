import { Module } from '@nestjs/common';
import { TasksController } from './presentation/tasks.controller';
import { InMemoryTaskRepository } from './database/in-memory-task-repository';
import { CreateTaskUseCase } from './business/use-cases/create-task-use-case';
import { GetAllTasksUseCase } from './business/use-cases/get-all-tasks-use-case';
import { GetTaskByIdUseCase } from './business/use-cases/get-task-by-id-use-case';
import { DeleteTaskUseCase } from './business/use-cases/delete-task-use-case';
import { UpdateTaskUseCase } from './business/use-cases/update-task-use-case';
import { CompleteTaskUseCase } from './business/use-cases/complete-task-use-case';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    GetAllTasksUseCase,
    GetTaskByIdUseCase,
    DeleteTaskUseCase,
    UpdateTaskUseCase,
    CompleteTaskUseCase,
    {
      provide: 'TASK_REPOSITORY',
      useClass: InMemoryTaskRepository,
    },
  ],
  exports: ['TASK_REPOSITORY'],
})
export class TasksModule { }
