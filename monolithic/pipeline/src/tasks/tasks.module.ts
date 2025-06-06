import { Module } from '@nestjs/common';
import { TasksController } from './presentation/tasks.controller';
import { InMemoryTaskRepository } from './database/in-memory-task-repository';
import { CreateTaskPipeline } from './pipelines/create-task-pipeline';
import { UpdateTaskPipeline } from './pipelines/update-task-pipeline';
import { SetTaskAsCompletedPipeline } from './pipelines/set-task-as-completed-pipeline';
import { GetTaskById } from './operations/get-task';
import { DeleteTaskPipeline } from './pipelines/delete-task-pipeline';
import { DeleteTask } from './operations/delete-task';
import { GetAllTasks } from './operations/get-all-tasks';
import { MergeUpdatedTaskFields } from './operations/merge-updated-task-fields';
import { PersistTask } from './operations/persist-task';
import { PersistUpdatedTask } from './operations/persist-update-task';
import { SetTaskAsCompleted } from './operations/set-task-as-completed';
import { TransformToTaskEntity } from './operations/transform-to-task-entity';
import { UpdateTaskFields } from './operations/update-task-fields';
import { ValidateTaskFields } from './operations/validate-task-fields-op';
import { ValidateUpdateTaskFields } from './operations/validate-update-task-fields';

@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskPipeline,
    UpdateTaskPipeline,
    SetTaskAsCompletedPipeline,
    SetTaskAsCompletedPipeline,
    DeleteTaskPipeline,
    UpdateTaskPipeline,
    DeleteTask,
    GetAllTasks,
    MergeUpdatedTaskFields,
    GetTaskById,
    PersistTask,
    PersistUpdatedTask,
    SetTaskAsCompleted,
    TransformToTaskEntity,
    UpdateTaskFields,
    ValidateTaskFields,
    ValidateUpdateTaskFields,
    {
      provide: 'TASK_REPOSITORY',
      useClass: InMemoryTaskRepository,
    },
  ],
  exports: ['TASK_REPOSITORY'],
})
export class TasksModule { }
