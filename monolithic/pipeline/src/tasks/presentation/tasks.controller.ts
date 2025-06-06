import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  HttpCode,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task-dto';
import { UpdateTaskDTO } from './dtos/update-task-dto';
import { CreateTaskPipeline } from '../pipelines/create-task-pipeline';
import { GetTaskById } from '../operations/get-task';
import { GetAllTasks } from '../operations/get-all-tasks';
import { DeleteTaskPipeline } from '../pipelines/delete-task-pipeline';
import { UpdateTaskPipeline } from '../pipelines/update-task-pipeline';
import { SetTaskAsCompletedPipeline } from '../pipelines/set-task-as-completed-pipeline';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskPipeline: CreateTaskPipeline,
    private readonly getTaskById: GetTaskById,
    private readonly getAllTasks: GetAllTasks,
    private readonly deleteTaskPipeline: DeleteTaskPipeline,
    private readonly updateTaskPipeline: UpdateTaskPipeline,
    private readonly setTaskAsCompletedPipeline: SetTaskAsCompletedPipeline,
  ) { }

  @Post()
  async create(@Body() createTaskDTO: CreateTaskDTO) {
    const task = await this.createTaskPipeline.execute(createTaskDTO);
    return task;
  }

  @Get()
  async getAll() {
    const tasks = await this.getAllTasks.execute();
    return tasks;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.getTaskById.execute(id);
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.deleteTaskPipeline.execute(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    const task = await this.updateTaskPipeline.execute({
      id,
      dto: updateTaskDTO,
    });
    return task;
  }

  @Post('/:id/complete')
  async completeTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.setTaskAsCompletedPipeline.execute(id);
    return task;
  }
}
