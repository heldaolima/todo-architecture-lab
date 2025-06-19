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
  UseGuards,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateTaskDTO } from '../tasks-service/presentation/dtos/create-task-dto';
import { CreateTaskUseCase } from '../tasks-service/business/use-cases/create-task-use-case';
import { GetAllTasksUseCase } from '../tasks-service/business/use-cases/get-all-tasks-use-case';
import { GetTaskByIdUseCase } from '../tasks-service/business/use-cases/get-task-by-id-use-case';
import { DeleteTaskUseCase } from '../tasks-service/business/use-cases/delete-task-use-case';
import { UpdateTaskDTO } from '../tasks-service/presentation/dtos/update-task-dto';
import { UpdateTaskUseCase } from '../tasks-service/business/use-cases/update-task-use-case';
import { CompleteTaskUseCase } from '../tasks-service/business/use-cases/complete-task-use-case';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { GetUser } from 'src/shared/decorators/user.decorator';
import { UserPayload } from 'src/shared/types/auth';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUC: CreateTaskUseCase,
    private readonly getAllTasksUC: GetAllTasksUseCase,
    private readonly getTaskByIdUC: GetTaskByIdUseCase,
    private readonly deleteTaskUC: DeleteTaskUseCase,
    private readonly updateTaskUC: UpdateTaskUseCase,
    private readonly completeTaskUC: CompleteTaskUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: UserPayload,
  ) {
    const [task, error] = await this.createTaskUC.execute(
      createTaskDTO,
      user.id,
    );
    if (error) {
      throw new BadRequestException(error);
    }

    return task;
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@GetUser() user: UserPayload) {
    return this.getAllTasksUC.execute(user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserPayload,
  ) {
    return this.getTaskByIdUC.execute(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserPayload,
  ) {
    await this.deleteTaskUC.execute(id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @GetUser() user: UserPayload,
  ) {
    return this.updateTaskUC.execute(id, updateTaskDTO, user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/complete')
  async completeTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserPayload,
  ) {
    return await this.completeTaskUC.execute(id, user.id);
  }
}
