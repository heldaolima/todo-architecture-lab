import { Module } from '@nestjs/common';
import { TasksController } from './presentation/tasks.controller';
import { BusinessModule } from './business/business.module';

@Module({
  controllers: [TasksController],
  imports: [BusinessModule]
})
export class TasksModule { }
