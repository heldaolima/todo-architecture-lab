import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Patch,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dtos/create-task-dto';
import { CreateTaskUseCase } from '../business/use-cases/create-task-use-case';
import { GetAllTasksUseCase } from '../business/use-cases/get-all-tasks-use-case';
import { GetTaskByIdUseCase } from '../business/use-cases/get-task-by-id-use-case';
import { DeleteTaskUseCase } from '../business/use-cases/delete-task-use-case';
import { UpdateTaskDTO } from './dtos/update-task-dto';
import { UpdateTaskUseCase } from '../business/use-cases/update-task-use-case';
import { CompleteTaskUseCase } from '../business/use-cases/complete-task-use-case';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUC: CreateTaskUseCase,
    private readonly getAllTasksUC: GetAllTasksUseCase,
    private readonly getTaskByIdUC: GetTaskByIdUseCase,
    private readonly deleteTaskUC: DeleteTaskUseCase,
    private readonly updateTaskUC: UpdateTaskUseCase,
    private readonly completeTaskUC: CompleteTaskUseCase,
  ) { }

  @Post()
  async create(@Body() createTaskDTO: CreateTaskDTO) {
    const [task, error] = await this.createTaskUC.execute(createTaskDTO);
    if (error) {
      return { message: error };
    }

    return task;
  }

  @Get()
  async getAll() {
    const tasks = await this.getAllTasksUC.execute();
    return tasks;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number, @Query('password') password?: string) {
    const task = await this.getTaskByIdUC.execute(id, password);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const ok = await this.deleteTaskUC.execute(id);
    if (!ok) {
      throw new NotFoundException('Task not found');
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ) {
    const task = await this.updateTaskUC.execute(id, updateTaskDTO);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Post('/:id/complete')
  async completeTask(@Param('id', ParseIntPipe) id: number) {
    const task = await this.completeTaskUC.execute(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }
}
