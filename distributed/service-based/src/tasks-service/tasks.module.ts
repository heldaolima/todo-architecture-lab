import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [BusinessModule],
  exports: [BusinessModule]
})
export class TasksModule { }
