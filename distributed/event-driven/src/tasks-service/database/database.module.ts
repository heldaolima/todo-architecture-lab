import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { PrismaTaskRepository } from './prisma-task-repository';

@Module({
  providers: [
    {
      provide: 'TASK_REPOSITORY',
      useClass: PrismaTaskRepository,
    },
  ],
  exports: ['TASK_REPOSITORY'],
  imports: [PrismaModule],
})
export class DatabaseModule {}

